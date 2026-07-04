import ReactMarkdown from 'react-markdown';

// react-markdown with raw HTML disabled by default (no rehype-raw), so
// reference bodies render safely.
export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-house">
      <ReactMarkdown
        components={{
          // Keep links safe and non-navigating away unexpectedly.
          a: ({ node: _node, ...props }) => <a {...props} rel="noopener noreferrer" />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
