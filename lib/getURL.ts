export const getServerSideURL = (): string => {
  return process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL || ''
}