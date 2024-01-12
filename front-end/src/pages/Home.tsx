import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'

interface BrokerResponse {
  error: boolean
  message: string
  data?: unknown
}

interface PageData {
  request: object
  response: BrokerResponse
}

const Home = () => {
  const [sent, setSent] = useState<object>()
  const [recieved, setRecieved] = useState<BrokerResponse>()

  const TestBroker = async () => {
    const result: PageData = await CallBroker()
    setSent(result.request)
    setRecieved(result.response)
  }

  const TestAuth = async (email: string, password: string) => {
    const result: PageData = await CallAuth(email, password)
    setSent(result.request)
    setRecieved(result.response)
  }

  const TestLog = async (name: string, data: string) => {
    const result: PageData = await CallLog(name, data)
    setSent(result.request)
    setRecieved(result.response)
  }

  return (
    <>
      <div className="container w-3/4 mx-auto">
        <h1 className="text-center font-bold text-2xl p-4">
          Test Microservices
        </h1>
        <hr />

        <div className="mt-5 flex gap-2">
          <button
            onClick={() => TestBroker()}
            className="bg-blue-500 hover:bg-blue-700 rounded-md text-white p-3"
          >
            Test Broker
          </button>

          <button
            onClick={() => TestAuth('admin@example.com', 'verysecret')}
            className="bg-blue-500 hover:bg-blue-700 rounded-md text-white p-3"
          >
            Test Auth
          </button>

          <button
            onClick={() => TestLog('event', 'Test Log')}
            className="bg-blue-500 hover:bg-blue-700 rounded-md text-white p-3"
          >
            Test Log
          </button>
        </div>

        <div className="mt-10 p-5 w-full border border-grey">
          <div className="font-bold">Output:</div>
          <div>{recieved?.message}</div>
        </div>

        <div className="mt-10 flex flex-row gap-1">
          <div className="basis-1/2">
            <h3>Sent</h3>
            <pre className="border min-h-20 p-3">
              {JSON.stringify(sent, undefined, 4)}
            </pre>
          </div>

          <div className="basis-1/2">
            <h3>Recieved</h3>
            <pre className="border min-h-20 p-3">
              {JSON.stringify(recieved, undefined, 4)}
            </pre>
          </div>
        </div>
      </div>
    </>
  )
}

async function CallLog(name: string, data: string) {
  const payload = {
    action: 'Log',
    log: {
      name: name,
      data: data,
    },
  }

  try {
    const response: AxiosResponse = await axios({
      method: 'POST',
      url: 'http://localhost:8080/handle',
      headers: { 'Content-Type': 'application/json' },
      data: payload,
    })

    return {
      request: payload,
      response: {
        error: false,
        message: response.data.message,
        data: response.data.data,
      },
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        request: payload,
        response: {
          error: true,
          message: err.message,
        },
      }
    }
  }

  return {
    request: payload,
    response: {
      error: true,
      message: 'Unknown error',
    },
  }
}

async function CallAuth(email: string, password: string): Promise<PageData> {
  const payload = {
    action: 'Auth',
    auth: {
      email: email,
      password: password,
    },
  }

  try {
    const response: AxiosResponse = await axios({
      method: 'POST',
      url: 'http://localhost:8080/handle',
      headers: { 'Content-Type': 'application/json' },
      data: payload,
    })
    return {
      request: payload,
      response: {
        error: false,
        message: response.data.message,
        data: response.data.data,
      },
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        request: payload,
        response: {
          error: true,
          message: err.message,
        },
      }
    }
  }

  return {
    request: payload,
    response: {
      error: true,
      message: 'Unknown error',
    },
  }
}

async function CallBroker(): Promise<PageData> {
  try {
    const response: AxiosResponse = await axios.post('http://localhost:8080')
    return {
      request: { request: 'Empty POST' },
      response: {
        error: false,
        message: response.data.message,
        data: response.data.data,
      },
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        request: { request: 'Empty POST' },
        response: {
          error: true,
          message: err.message,
        },
      }
    }
  }

  return {
    request: { request: 'Empty POST' },
    response: {
      error: true,
      message: 'Unknown error',
    },
  }
}

export default Home
