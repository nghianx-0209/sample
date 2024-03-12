import { PrefPopulation } from '@/types/population'
import { Prefecture } from '@/types/prefecture'

const BASE_URL = 'https://opendata.resas-portal.go.jp/'
const X_API_KEY = 'JR9hxfebxzUfEnn0AJP9LCz20tnFJBk9I39gXLuw'

export interface IPrefectureResponse {
  message: string,
  result: Prefecture[]
}

export interface IPopulationResponse {
  message: string,
  result: PrefPopulation[]
}

export const route = {
  getPrefectures: 'api/v1/prefectures',
  getPopulation: 'api/v1/population/composition/perYear?cityCode=-&prefCode=_prefCode'
}

export default async function request(req: string, option: any = { method: 'GET' }) {
  const res = await fetch(BASE_URL + req, {
      ...option, 
      headers: {
        'X-API-KEY': X_API_KEY
      }
    }
  )

  return res
}

export async function getPrefectures<IPrefectureResponse>() {
  const res = await request(route.getPrefectures)

  return res.json()
}

export async function getPopulation<IPopulationResponse>(prefCode: string) {
  const res = await request(route.getPopulation.replace('_prefCode', prefCode))

  return res.json()
}
