// Simple toast utility to avoid direct imports from react-hot-toast
// This helps with module resolution issues

let toastInstance = null;

export const initializeToast = (toastModule) => {
  toastInstance = toastModule;
};

export const toast = {
  success: (message) => {
    if (toastInstance && toastInstance.success) {
      toastInstance.success(message);
    } else {
      console.log('Toast success:', message);
    }
  },
  error: (message) => {
    if (toastInstance && toastInstance.error) {
      toastInstance.error(message);
    } else {
      console.error('Toast error:', message);
    }
  },
  info: (message) => {
    if (toastInstance && toastInstance.info) {
      toastInstance.info(message);
    } else {
      console.info('Toast info:', message);
    }
  }
};

export const Toaster = ({ children }) => {
  // This is a placeholder component that will be replaced by the actual Toaster
  return children;
}; 