import Cookies from 'js-cookie'

const BEEN_KEY = 'atlasly_been'
const WISH_KEY = 'atlasly_wish'
const RATINGS_KEY = 'atlasly_ratings'
const NAMES_KEY = 'atlasly_names'
const EXPIRES = 365

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

export function saveCountry(mode, countryCode, countryName) {
    const key = mode === 'been' ? BEEN_KEY : WISH_KEY
    const existing = getSelectedCountries(mode)
    existing.add(countryCode)
    Cookies.set(key, JSON.stringify([...existing]), { expires: EXPIRES })

    if (countryName) {
        const names = getCountryNames()
        names[countryCode] = countryName
        Cookies.set(NAMES_KEY, JSON.stringify(names), { expires: EXPIRES })
    }
}

export function removeCountry(mode, countryCode) {
    const key = mode === 'been' ? BEEN_KEY : WISH_KEY
    const existing = getSelectedCountries(mode)
    existing.delete(countryCode)
    Cookies.set(key, JSON.stringify([...existing]), { expires: EXPIRES })
}

export function getCountryNames() {
    const val = Cookies.get(NAMES_KEY)
    if (!val) return {}
    try { return JSON.parse(val) } catch { return {} }
}

export function getRatings() {
    const val = Cookies.get(RATINGS_KEY)
    if (!val) return {}
    try { return JSON.parse(val) } catch { return {} }
}

export function setRating(countryCode, rating) {
    const ratings = getRatings()
    ratings[countryCode] = rating
    Cookies.set(RATINGS_KEY, JSON.stringify(ratings), { expires: EXPIRES })
}