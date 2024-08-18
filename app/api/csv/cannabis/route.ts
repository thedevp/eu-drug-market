//app/api/csv/cannabis/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('file');

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'data', 'cannabis', `${filename}.csv`);

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const records = parse(fileContents, {
      columns: true,
      skip_empty_lines: true
    });

    return NextResponse.json(records);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read CSV file' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action } = body;

  if (action === 'list') {
    try {
      const cannabisDir = path.join(process.cwd(), 'data', 'cannabis');
      const files = await fs.readdir(cannabisDir);
      const csvFiles = files.filter(file => path.extname(file).toLowerCase() === '.csv');
      return NextResponse.json(csvFiles);
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to list CSV files' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}