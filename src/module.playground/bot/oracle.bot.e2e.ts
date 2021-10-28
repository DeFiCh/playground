import { PlaygroundTesting } from '@src/e2e.module'
import waitForExpect from 'wait-for-expect'
import { SetupOracle } from '../setup/setup.oracle'

const testing = new PlaygroundTesting()

beforeAll(async () => {
  await testing.start()
})

afterAll(async () => {
  await testing.stop()
})

describe('oracle bot', () => {
  it('should change oracle price', async () => {
    const setupOracle = testing.app.get(SetupOracle)
    const oracleId = setupOracle.oracleIds[0]

    await waitForExpect(async () => {
      const oracleData = await testing.client.oracle.getOracleData(oracleId)

      const CU10 = oracleData.tokenPrices.find(x => x.token === 'CU10')
      expect(CU10?.amount).toBeDefined()

      const TU10 = oracleData.tokenPrices.find(x => x.token === 'TU10')
      expect(TU10?.amount).toBeDefined()

      const CD10 = oracleData.tokenPrices.find(x => x.token === 'CD10')
      expect(CD10?.amount).toBeDefined()

      const TD10 = oracleData.tokenPrices.find(x => x.token === 'TD10')
      expect(TD10?.amount).toBeDefined()

      const CS25 = oracleData.tokenPrices.find(x => x.token === 'CS25')
      expect(CS25?.amount).toBeDefined()

      const TS25 = oracleData.tokenPrices.find(x => x.token === 'TS25')
      expect(TS25?.amount).toBeDefined()

      const CR50 = oracleData.tokenPrices.find(x => x.token === 'CR50')
      expect(CR50?.amount).toBeDefined()

      const TR50 = oracleData.tokenPrices.find(x => x.token === 'TR50')
      expect(TR50?.amount).toBeDefined()

      const DFI = oracleData.tokenPrices.find(x => x.token === 'DFI')
      expect(DFI?.amount).toBeDefined()

      const BTC = oracleData.tokenPrices.find(x => x.token === 'BTC')
      expect(BTC?.amount).toBeDefined()

      const ETH = oracleData.tokenPrices.find(x => x.token === 'ETH')
      expect(ETH?.amount).toBeDefined()

      const USDC = oracleData.tokenPrices.find(x => x.token === 'USDC')
      expect(USDC?.amount).toBeDefined()

      const USDT = oracleData.tokenPrices.find(x => x.token === 'USDT')
      expect(USDT?.amount).toBeDefined()
    }, 200000)
  })
})
