export interface TabData {
  id: string
  value: string
  name: string
  icon?: string
  link?: string
}

export const headerTabsDataCreation = () => {
  const productTabsData: TabData[] = [
    {
      id: '1',
      name: 'Мои заявки',
      value: 'myApplications',
      link: 'applications',
    },
    {
      id: '2',
      name: 'Создать заявку',
      value: 'createApplications',
      link: 'applications/create',
    },
  ]

  return productTabsData
}
