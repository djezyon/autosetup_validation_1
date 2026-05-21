import './ExplorerPanel.css';

interface TreeNode {
  name: string;
  icon: string;
  depth?: number;
  expanded?: boolean;
  selected?: boolean;
  children?: TreeNode[];
}

const TREE: TreeNode[] = [
  {
    name: 'Workspace',
    icon: '🌐',
    expanded: true,
    children: [
      { name: 'Camera', icon: '📷', depth: 1 },
      { name: 'Terrain', icon: '⛰', depth: 1 },
      { name: 'SpawnLocation', icon: '⚙', depth: 1 },
      {
        name: 'Stargirl_V2',
        icon: '🧩',
        depth: 1,
        expanded: true,
        selected: true,
        children: [
          { name: 'Hair_Brown', icon: '🎩', depth: 2 },
          { name: 'Brows Brown', icon: '👕', depth: 2 },
          { name: 'Anime Lashes', icon: '👕', depth: 2 },
          { name: 'Tank_Top', icon: '👕', depth: 2 },
          { name: 'Sweatpants', icon: '👕', depth: 2 },
          {
            name: 'Makeup',
            icon: '📁',
            depth: 2,
            expanded: true,
            children: [
              { name: 'Glam Eyeshadow', icon: '🖼', depth: 3 },
              { name: 'Glam Eyeliner', icon: '🖼', depth: 3 },
              { name: 'Glam Lip', icon: '🖼', depth: 3 },
              { name: 'Glam Blush', icon: '🖼', depth: 3 },
            ],
          },
        ],
      },
    ],
  },
];

function TreeRow({ node }: { node: TreeNode }) {
  const depth = node.depth ?? 0;
  return (
    <>
      <div
        className={
          node.selected
            ? 'explorer__row explorer__row--selected'
            : 'explorer__row'
        }
        style={{ paddingLeft: `${8 + depth * 16}px` }}
      >
        {node.children ? (
          <span className="explorer__arrow">{node.expanded ? '▾' : '▸'}</span>
        ) : (
          <span className="explorer__arrow explorer__arrow--spacer" />
        )}
        <span className="explorer__icon">{node.icon}</span>
        <span className="explorer__name">{node.name}</span>
      </div>
      {node.expanded &&
        node.children?.map((child) => <TreeRow key={child.name} node={child} />)}
    </>
  );
}

export function ExplorerPanel() {
  return (
    <section className="explorer" aria-label="Explorer">
      <header className="explorer__header">
        <span>Explorer</span>
        <div className="explorer__header-actions" aria-hidden>
          <button type="button">⧉</button>
          <button type="button">×</button>
        </div>
      </header>
      <div className="explorer__filter">
        <input type="search" placeholder="Search" aria-label="Filter explorer" />
      </div>
      <div className="explorer__tree">
        {TREE.map((node) => (
          <TreeRow key={node.name} node={node} />
        ))}
      </div>
    </section>
  );
}
