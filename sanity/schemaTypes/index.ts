import { postType } from './post'
import { pageType } from './page'
import { categoryType } from './category'
import { heroSettingsType } from './heroSettings'
import { servicesSettingsType } from './servicesSettings'
import { testimonialsSettingsType } from './testimonialsSettings'
import { aboutSettingsType } from './aboutSettings'
import { siteSettingsType } from './siteSettings'
import { headerSettingsType } from './headerSettings'
import { footerSettingsType } from './footerSettings'

export const schemaTypes = [
  // Content
  postType,
  pageType,
  categoryType,
  // Singletons
  heroSettingsType,
  servicesSettingsType,
  testimonialsSettingsType,
  aboutSettingsType,
  siteSettingsType,
  headerSettingsType,
  footerSettingsType,
]
