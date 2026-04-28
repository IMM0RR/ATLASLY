import Cookies from 'js-cookie'

const BEEN_KEY = 'atlasly_been'
const WISH_KEY = 'atlasly_wish'
const EXPIRES = 365 // days

export function getSelectedCountries(mode) {
  const key = mode === 'been' ? BEEN_KEY : WISH_KEY
  const val = Cookies.get(key)
  if (!val) return new Set()
  try {
    return new Set(JSON.parse(val))
  } catch {
    return new Set()
  }
}

export function saveCountry(mode, countryCode) {
  const key = mode === 'been' ? BEEN_KEY : WISH_KEY
  const existing = getSelectedCountries(mode)
  existing.add(countryCode)
  Cookies.set(key, JSON.stringify([...existing]), { expires: EXPIRES })
}

export function removeCountry(mode, countryCode) {
  const key = mode === 'been' ? BEEN_KEY : WISH_KEY
  const existing = getSelectedCountries(mode)
  existing.delete(countryCode)
  Cookies.set(key, JSON.stringify([...existing]), { expires: EXPIRES })
}
