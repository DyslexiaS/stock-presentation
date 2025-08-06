import { Card, CardContent } from '@/components/ui/card'
import { Bell, Brain, ChevronRight, Sparkles, Zap } from 'lucide-react'

export function PromotionCards() {
  return (
    <div className="space-y-6">
      {/* FinmoAI 智能分析 */}
      <Card className="group relative bg-gradient-to-br from-[#493DC7]/5 via-[#493DC7]/8 to-[#493DC7]/10 border-[#493DC7]/20 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden hover:border-[#493DC7]/30">
        {/* Animated background decoration */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#493DC7]/20 to-[#493DC7]/30 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#493DC7]/25 to-[#493DC7]/15 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
        
        {/* Subtle moving dots */}
        <div className="absolute top-4 left-4 w-1 h-1 bg-[#493DC7]/60 rounded-full opacity-60 animate-ping"></div>
        <div className="absolute top-8 right-8 w-0.5 h-0.5 bg-[#493DC7]/70 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-6 right-6 w-1 h-1 bg-[#493DC7]/50 rounded-full opacity-50" style={{animationDelay: '1s'}}></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        <CardContent className="p-5 relative">
          <div className="flex items-center mb-4">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-[#493DC7] to-[#493DC7]/90 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-[#493DC7]/25 group-hover:scale-105 transition-all duration-300">
                <Brain className="h-5 w-5 text-white group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-[#493DC7]/70 animate-pulse group-hover:text-[#493DC7]/90" />
              {/* Subtle glow ring */}
              <div className="absolute inset-0 rounded-lg bg-[#493DC7]/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 blur-sm"></div>
            </div>
            <div className="ml-3 flex-1">
              <div className="flex items-center">
                <h3 className="text-lg font-bold text-foreground">🤖 FinmoAI</h3>
                <span className="ml-2 px-2 py-1 text-xs font-semibold bg-gradient-to-r from-[#493DC7]/10 to-[#493DC7]/20 text-[#493DC7] rounded-full border border-[#493DC7]/30">
                  BETA
                </span>
              </div>
              <div className="flex items-center mt-1 text-xs text-[#493DC7]/80">
                <Zap className="h-3 w-3 mr-1" />
                <span>AI 驅動 • 法說會分析</span>
              </div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              <div className="relative mr-2">
                <div className="w-1.5 h-1.5 bg-[#493DC7] rounded-full"></div>
                <div className="absolute inset-0 w-1.5 h-1.5 bg-[#493DC7]/70 rounded-full animate-ping opacity-30"></div>
              </div>
              法說會逐字稿
            </div>
            <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 delay-75">
              <div className="relative mr-2">
                <div className="w-1.5 h-1.5 bg-[#493DC7]/80 rounded-full"></div>
                <div className="absolute inset-0 w-1.5 h-1.5 bg-[#493DC7]/60 rounded-full animate-ping opacity-30" style={{animationDelay: '0.5s'}}></div>
              </div>
              生成重點摘要和投資要點
            </div>
            <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 delay-150">
              <div className="relative mr-2">
                <div className="w-1.5 h-1.5 bg-[#493DC7]/70 rounded-full"></div>
                <div className="absolute inset-0 w-1.5 h-1.5 bg-[#493DC7]/50 rounded-full animate-ping opacity-30" style={{animationDelay: '1s'}}></div>
              </div>
              挖掘潛在投資機會
            </div>
          </div>

          <a
            href="https://finmoai.diveinvest.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center px-4 py-3 bg-gradient-to-r from-[#493DC7] to-[#493DC7]/90 text-white text-sm font-semibold rounded-lg hover:from-[#493DC7]/90 hover:to-[#493DC7]/80 transition-all duration-300 w-full justify-center shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Brain className="h-4 w-4 mr-2 group-hover:animate-pulse" />
            <span>體驗 AI 智能分析</span>
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
          </a>
        </CardContent>
      </Card>

      {/* Telegram 通知服務 */}
      <Card className="group relative bg-gradient-to-br from-blue-50/80 via-blue-50/60 to-slate-50/80 border-blue-200/60 overflow-hidden hover:shadow-md transition-all duration-300">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-100/40 to-blue-50/20 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-slate-100/30 to-blue-50/20 rounded-full blur-lg group-hover:scale-110 transition-transform duration-700"></div>
        
        {/* Subtle moving dot */}
        <div className="absolute top-3 left-3 w-0.5 h-0.5 bg-blue-400/60 rounded-full animate-pulse opacity-40"></div>
        
        <CardContent className="relative p-4">
          <div className="flex items-center mb-3">
            <div className="relative mr-2">
              <Bell className="h-6 w-6 text-blue-600 group-hover:text-blue-700 transition-colors group-hover:scale-105 duration-300" />
              {/* Notification ring animation */}
              <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"></div>
            </div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-slate-800 transition-colors">📱 即時通知服務</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4 group-hover:text-slate-600 transition-colors">
            加入我們的 Telegram 機器人 @diveinvest_bot，每晚 8 點自動推送最新法說會簡報。
          </p>
          <a
            href="https://t.me/diveinvest_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 w-full justify-center hover:scale-105 shadow-sm hover:shadow-md"
          >
            <Bell className="h-4 w-4 mr-2 group-hover/btn:animate-pulse" />
            加入 Telegram 通知
            {/* Subtle shine effect */}
            <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity blur-sm"></div>
          </a>
        </CardContent>
      </Card>
    </div>
  )
} 