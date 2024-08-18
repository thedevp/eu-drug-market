// app/Header.tsx

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-zinc-100 dark:bg-zinc-900">
      <h1 className="text-2xl font-bold">EU Drug Market Dashboard</h1>
      <nav className="flex items-center gap-4">
        <a href="#" className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300">
          Home
        </a>
        <a href="#" className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300">
          About
        </a>
        <a href="#" className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300">
          Contact
        </a>
      </nav>
    </header>
  );
}