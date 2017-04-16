export type MenuItem = {
  name: string,
  path: string,
  icon?: string
}

const menuItems: MenuItem[] = [
  {
    name: 'Home',
    path: '/',
    icon: 'home'
  },
  {
    name: 'Search',
    path: '/',
    icon: 'search'
  }
]

export default menuItems
