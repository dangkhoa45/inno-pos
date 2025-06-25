import type { Product } from '@/types/sale'

export interface GroupTreeItem {
  id: string
  label: string
  children?: GroupTreeItem[]
}

export function generateGroupTreeFromProducts(
  products: Product[],
): GroupTreeItem[] {
  const groupMap: Record<string, Set<string>> = {}

  for (const product of products) {
    const groupId = product.group
    if (!groupId) continue

    const [parent] = groupId.split('/')
    const root = parent || 'khac'

    if (!groupMap[root]) {
      groupMap[root] = new Set()
    }
    groupMap[root].add(groupId)
  }

  return Object.entries(groupMap).map(([root, children]) => ({
    id: root,
    label: root.charAt(0).toUpperCase() + root.slice(1),
    children: Array.from(children).map((id) => ({
      id,
      label: id.split('/').slice(1).join(' ').replace(/-/g, ' '),
    })),
  }))
}
