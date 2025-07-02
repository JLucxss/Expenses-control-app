import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { SummariesService } from './summaries.service';

@UseGuards(JwtAuthGuard)
@Controller('summaries')
export class SummariesController {
    constructor(private readonly summariesService: SummariesService){}

    @Get('weeklySummary')
    getWeeklySummary(@Request() req) {
        return this.summariesService.getWeeklySummary(req.user.id)
    }

    @Get('monthlySummaries')
    getMonthlySummaries(@Request() req) {
        return this.summariesService.getMonthlySummaries(req.user.id)
    }
}
