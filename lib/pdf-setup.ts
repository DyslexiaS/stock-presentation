'use client'

// PDF.js setup with polyfills for server-side rendering
export const setupPDFJS = async () => {
  if (typeof window === 'undefined') return

  // Polyfill DOMMatrix if not available
  if (typeof DOMMatrix === 'undefined') {
    (globalThis as any).DOMMatrix = class DOMMatrix {
      constructor() {
        // Minimal polyfill for DOMMatrix
      }
      static fromMatrix() {
        return new DOMMatrix()
      }
      translate() {
        return this
      }
      scale() {
        return this
      }
      rotate() {
        return this
      }
    }
  }

  const pdfjs = await import('react-pdf')
  
  // Set up worker
  pdfjs.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.pdfjs.version}/build/pdf.worker.min.js`
  
  return pdfjs
}