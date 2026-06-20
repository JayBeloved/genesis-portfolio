import React from 'react';

export const sovereignComponents = {
  p: (props: any) => <p className="mb-8 leading-[2.2] text-lg text-gray-300 whitespace-pre-wrap tracking-wide" {...props} />,
  h1: (props: any) => <h1 className="mt-16 mb-8 text-4xl font-serif font-bold text-white tracking-tight" {...props} />,
  h2: (props: any) => <h2 className="mt-16 mb-6 text-2xl font-serif font-semibold text-white border-b border-blueprint-dark pb-4" {...props} />,
  h3: (props: any) => <h3 className="mt-12 mb-4 text-xl font-sans font-bold text-sovereign uppercase tracking-widest" {...props} />,
  ul: (props: any) => <ul className="mb-8 ml-6 list-disc space-y-3 text-gray-300 text-lg leading-[2.2]" {...props} />,
  ol: (props: any) => <ol className="mb-8 ml-6 list-decimal space-y-3 text-gray-300 text-lg leading-[2.2]" {...props} />,
  li: (props: any) => <li className="pl-2" {...props} />,
  strong: (props: any) => <strong className="font-bold text-white" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-sovereign pl-6 py-2 my-8 italic text-gray-400 bg-obsidian-light/50" {...props} />,
  table: (props: any) => <div className="overflow-x-auto my-12"><table className="w-full text-left border-collapse" {...props} /></div>,
  th: (props: any) => <th className="border border-blueprint-dark bg-obsidian p-4 font-mono text-sovereign text-sm uppercase tracking-wider" {...props} />,
  td: (props: any) => <td className="border border-blueprint-dark p-4 text-gray-300 text-base" {...props} />,
  code: (props: any) => <code className="font-mono text-sm text-sovereign bg-obsidian px-2 py-1 rounded border border-blueprint-dark" {...props} />,
  pre: (props: any) => <pre className="p-6 bg-obsidian-light border border-blueprint-dark overflow-x-auto my-8 rounded-none" {...props} />
};
