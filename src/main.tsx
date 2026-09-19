import {StrictMode, Component, ErrorInfo, ReactNode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in BISENCE:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-white rounded-xl border-2 border-slate-300 p-6 shadow-md text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FEF08A] border border-[#F59E0B] flex items-center justify-center text-[#78350F] font-bold text-xl">
              !
            </div>
            <h2 className="text-lg font-extrabold text-[#0A3D91]">
              BISENCE Platform Notice
            </h2>
            <p className="text-xs text-slate-600">
              The application encountered a display issue. Click below to reload.
            </p>
            {this.state.error?.message && (
              <div className="text-[11px] p-2.5 bg-slate-100 rounded text-rose-700 font-mono text-left overflow-auto max-h-28 border border-slate-200">
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#0A3D91] text-white text-xs font-bold rounded-lg shadow hover:bg-[#072B68] transition cursor-pointer"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

