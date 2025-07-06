import React from 'react';
import { Link } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Komponenten-Fehler:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
          <div className="bg-gray-800 rounded-xl p-8 max-w-lg text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Oops! Etwas ist schiefgelaufen</h1>
            <p className="text-gray-300 mb-6">
              Es gab ein Problem beim Laden dieser Seite. Versuche es mit einem Reload oder gehe zurück zur Startseite.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                Seite neu laden
              </button>
              <Link
                to="/"
                className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
              >
                Zur Startseite
              </Link>
            </div>
            {this.state.error && (
              <div className="mt-8 text-left">
                <details className="text-xs text-gray-400 bg-gray-900 p-4 rounded-lg">
                  <summary>Fehlerdetails</summary>
                  <pre className="mt-2 overflow-x-auto">{this.state.error.toString()}</pre>
                </details>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
