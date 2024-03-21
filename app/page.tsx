'use client'

import { Prefecture } from '@/types/prefecture'
import { IPopulationResponse, getPopulation, getPrefectures } from './api'
import { Ref, useEffect, useRef, useState } from 'react'
import Checkbox from './_components/Checkbox/checkbox'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { PopulationByYear, PropPopulation } from '@/types/population'
import { PopulationText, PopulationType } from '@/constant'

export default function Home() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  const [selectedPref, setSelectedPref] = useState<Prefecture[]>([])
  const [disbleClick, setDisableClick] = useState<Boolean>(false)
  const [populationType, setType] = useState<number>(0)
  const itemsRef = useRef<(any)[]>([])
  const [chartOption, setChartOption] = useState<Highcharts.Options>({
    title: {
      text: '',
    },
    yAxis: {
      title: {
        text: '人口'
      }
    },
    series: [],
  })

  const getPrefInfo = async (prefCode: string) => {
    const populationInfo = await getPopulation(prefCode)

    return populationInfo
  }

  const selectPrefHandle = async (prefData: Prefecture, status: boolean) => {
    setDisableClick(true)
    if (status) {
      setSelectedPref(
        selectedPref.filter(
          (pref: Prefecture) => pref.prefCode !== prefData.prefCode
        )
      )

      setDisableClick(false)
    } else {
      getPrefInfo(prefData.prefCode)
        .then((res) => {
          setSelectedPref([...selectedPref, { ...prefData, ...res }])
        })
        .catch((e) => {})
        .finally(() => setDisableClick(false))
    }
  }

  useEffect(() => {
    getPrefectures().then((response) => setPrefectures(response.result))
  }, [])

  useEffect(() => {
    if (selectedPref.length === 0) {
      const _xAxisOption: Highcharts.XAxisOptions = {
        categories: []
      }

      for (let year = 1960; year <= 2045; year = year + 5) {
        _xAxisOption.categories?.push(`${year}`)
      }

      setChartOption((chartOption) => ({
        ...chartOption,
        series: [],
        xAxis: _xAxisOption,
        title: {
          text: PopulationText[populationType]
        }
      }))
    } else {
      const _seriesOptions: Highcharts.SeriesOptionsType[] = []
      const _xAxisOption: Highcharts.XAxisOptions = {
        categories: [],
      }

      selectedPref.forEach((pref: Prefecture) => {
        _seriesOptions.push({
            type: 'spline',
            name: pref.prefName,
            data: pref.result.data[populationType].data.map(
              (byYear: PopulationByYear) => byYear.value
            ),
          })
      })

      selectedPref[0]?.result.data[0]?.data.map((byYear: PopulationByYear) => {
        _xAxisOption.categories?.push(byYear.year)
      })

      setChartOption((chartOption) => ({
        ...chartOption,
        series: _seriesOptions,
        xAxis: _xAxisOption,
        title: {
          text: PopulationText[populationType]
        }
      }))
    }
  }, [selectedPref, populationType])

  const handleChangePopulationType = (e: React.ChangeEvent<HTMLElement>) => {
    setType(Number((e.target as HTMLInputElement).value))
  }

  const handleRest = () => {
    prefectures.forEach((pref: Prefecture, index: number) => itemsRef.current[index]?.reset())
    setSelectedPref([])
    setType(PopulationType.TOTAL)
  }

  return (
    <div className="px-24 bg-slate-500 h-screen">
      <div className="bg-white h-full">
        <div className="justify-between p-4">
          <div className="flex flex-wrap">
            {prefectures.map((prefecture: Prefecture, index: number) => (
              <Checkbox
                key={prefecture.prefCode}
                data={prefecture}
                onClick={selectPrefHandle}
                disable={disbleClick}
                ref={(el: HTMLDivElement | null) => itemsRef.current[index] = el} 
              />
            ))}
          </div>

          <div className="bg-slate-300 h-px w-full m-auto my-4" />

          <div className='flex m-auto w-full justify-around'>
            <div className='flex justify-around items-center w-9/12'>
              <div>
                <input
                  type="checkbox"
                  id="total"
                  name="scales"
                  checked={populationType === PopulationType.TOTAL}
                  value={PopulationType.TOTAL}
                  className='mr-2'
                  onChange={handleChangePopulationType}
                />
                <label htmlFor="total">総人口</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="young"
                  name="young"
                  checked={populationType === PopulationType.YOUNG_AGE}
                  value={PopulationType.YOUNG_AGE}
                  className='mr-2'
                  onChange={handleChangePopulationType}
                />
                <label htmlFor="young">年少人口</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="production"
                  name="production"
                  checked={populationType === PopulationType.PRODUCTION_AGE}
                  value={PopulationType.PRODUCTION_AGE}
                  className='mr-2'
                  onChange={handleChangePopulationType}
                />
                <label htmlFor="production">生産年齢人口</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="old"
                  name="old"
                  checked={populationType === PopulationType.OLD_AGE}
                  value={PopulationType.OLD_AGE}
                  className='mr-2'
                  onChange={handleChangePopulationType}
                />
                <label htmlFor="old">老年人口</label>
              </div>
            </div>
            <div>
              <input
                type='submit'
                value='リセット'
                className='border rounded-lg p-1 cursor-pointer bg-red-400 border-red-400 text-white'
                onClick={handleRest}
              />
            </div>
          </div>
        </div>
        <div>
          <HighchartsReact highcharts={Highcharts} options={chartOption} />
        </div>
      </div>
    </div>
  )
}
