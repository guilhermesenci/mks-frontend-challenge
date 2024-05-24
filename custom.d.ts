import React from "react";

declare namespace jest {
  interface Matchers<R, T> {
    toBeInTheDocument(): R;
  }
}

import { AriaAttributes, DOMAttributes } from "react";

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto';
  }
};