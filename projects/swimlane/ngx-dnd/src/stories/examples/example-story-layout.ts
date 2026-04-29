/**
 * Shared layout: live demo on top, read-only "Template" block below (Canvas + Docs).
 * Bind `_ngxDndStorySource` to the markup string to show (usually the trimmed demo template).
 * Used by Examples stories and Documentation Components or Directives example pages.
 */
export const EXAMPLE_STORY_LAYOUT_STYLES = `
  .ngx-dnd-story-layout {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .ngx-dnd-story-source {
    border-top: 1px solid rgb(208, 215, 222);
    padding-top: 0.75rem;
  }
  .ngx-dnd-story-source-heading {
    margin: 0 0 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: rgb(87, 96, 106);
  }
  .ngx-dnd-story-source-pre {
    margin: 0;
    padding: 0.75rem 1rem;
    background: rgb(246, 248, 250);
    border: 1px solid rgb(208, 215, 222);
    border-radius: 6px;
    overflow: auto;
    max-height: 320px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 12px;
    line-height: 1.45;
    color: rgb(36, 41, 47);
    white-space: pre-wrap;
    word-break: break-word;
  }
`;

export function exampleStoryLayoutTemplate(demoInner: string): string {
  const inner = demoInner.trim();
  return `
<div class="ngx-dnd-story-layout">
  <div class="ngx-dnd-story-demo">${inner}</div>
  <section class="ngx-dnd-story-source" aria-labelledby="ngx-dnd-story-source-h">
    <h4 id="ngx-dnd-story-source-h" class="ngx-dnd-story-source-heading">Template</h4>
    <pre class="ngx-dnd-story-source-pre"><code>{{ _ngxDndStorySource }}</code></pre>
  </section>
</div>
`;
}
