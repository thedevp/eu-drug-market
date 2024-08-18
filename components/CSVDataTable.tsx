"use client"

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

async function fetchCSVData(filename: string) {
  const response = await fetch(`/api/csv/cannabis?file=${filename}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

async function fetchCSVFiles() {
  const response = await fetch('/api/csv/cannabis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'list' })
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export default function CSVDataTable() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const { data: files = [], isLoading: filesLoading, error: filesError } = useQuery({
    queryKey: ['csvFiles'],
    queryFn: fetchCSVFiles,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['csvData', selectedFile],
    queryFn: () => selectedFile ? fetchCSVData(selectedFile) : null,
    enabled: !!selectedFile,
  });

  if (filesLoading) return <div>Loading files...</div>;
  if (filesError) return <div>Error loading files: {filesError instanceof Error ? filesError.message : 'Unknown error'}</div>;

  if (files.length === 0) return <div>No CSV files available</div>;

  return (
    <div>
      <Select onValueChange={(value) => setSelectedFile(value)}>
        <SelectTrigger className="w-[180px] mb-4">
          <SelectValue placeholder="Select a file" />
        </SelectTrigger>
        <SelectContent>
          {files.map((file: string) => (
            <SelectItem key={file} value={file.replace('.csv', '')}>
              {file}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isLoading && <div>Loading data...</div>}
      {error && <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>}
      
      {data && data.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(data[0]).map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row: Record<string, any>, index: number) => (
              <TableRow key={index}>
                {Object.keys(data[0]).map((header) => (
                  <TableCell key={header}>{row[header]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}