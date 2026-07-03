interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex h-64 w-full flex-col items-center justify-center gap-3 text-center">
      <p className="text-sm text-red-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded bg-steam-blue px-4 py-1.5 text-sm font-medium text-steam-darker hover:bg-steam-blue/80"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}