import { Controller, Get } from '@nestjs/common'
import { HealthCheck, HealthCheckResult, HealthCheckService } from '@nestjs/terminus'
import { DeFiDProbeIndicator } from '@src/module.defid/defid.indicator'
import { PlaygroundProbeIndicator } from '@src/module.playground/_indicator'

@Controller('/_health')
export class HealthController {
  constructor (
    private readonly health: HealthCheckService,
    private readonly defid: DeFiDProbeIndicator,
    private readonly playground: PlaygroundProbeIndicator) {
  }

  /**
   * Indicates whether the service is running.
   * If the liveness probe fails, the service should be killed and subjected to a restart policy.
   * @see https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#when-should-you-use-a-liveness-probe
   */
  @Get('/probes/liveness')
  @HealthCheck()
  async liveness (): Promise<HealthCheckResult> {
    return await this.health.check([
      async () => await this.defid.liveness(),
      async () => await this.playground.liveness()
    ])
  }

  /**
   * Indicates whether the service is ready to respond to requests.
   * If the readiness probe fails, the endpoints are not ready to receive and respond to any request.
   * @see https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#when-should-you-use-a-readiness-probe
   */
  @Get('/probes/readiness')
  @HealthCheck()
  async readiness (): Promise<HealthCheckResult> {
    return await this.health.check([
      async () => await this.defid.readiness(),
      async () => await this.playground.readiness()
    ])
  }
}
