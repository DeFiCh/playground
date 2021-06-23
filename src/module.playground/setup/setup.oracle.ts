import { PlaygroundSetup } from '@src/module.playground/setup/setup'
import { Injectable } from '@nestjs/common'
import { AppointOracleOptions, OraclePriceFeed } from '@defichain/jellyfish-api-core/dist/category/oracle'

interface OracleSetup {
  address: string
  priceFeeds: OraclePriceFeed[]
  options: AppointOracleOptions
}

@Injectable()
export class SetupOracle extends PlaygroundSetup<OracleSetup> {
  list (): OracleSetup[] {
    return [
      {
        address: PlaygroundSetup.address,
        priceFeeds: [
          {
            token: 'TSLA',
            currency: 'USD'
          },
          {
            token: 'AAPL',
            currency: 'USD'
          },
          {
            token: 'FB',
            currency: 'USD'
          }
        ],
        options: {
          weightage: 1.0
        }
      },
      {
        address: PlaygroundSetup.address,
        priceFeeds: [
          {
            token: 'TSLA',
            currency: 'USD'
          },
          {
            token: 'AAPL',
            currency: 'USD'
          },
          {
            token: 'FB',
            currency: 'USD'
          }
        ],
        options: {
          weightage: 1.0
        }
      },
      {
        address: PlaygroundSetup.address,
        priceFeeds: [
          {
            token: 'TSLA',
            currency: 'USD'
          },
          {
            token: 'AAPL',
            currency: 'USD'
          },
          {
            token: 'FB',
            currency: 'USD'
          }
        ],
        options: {
          weightage: 1.0
        }
      }
    ]
  }

  async create (each: OracleSetup): Promise<void> {
    await this.waitForBalance(101)
    await this.client.oracle.appointOracle(each.address, each.priceFeeds, each.options)
    await this.generate(1)
  }

  async has (each: OracleSetup): Promise<boolean> {
    try {
      return (await this.client.oracle.listOracles()).length >= 3
    } catch (e) {
      return false
    }
  }
}
