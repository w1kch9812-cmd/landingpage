import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

// Pretendard 폰트 (유일하게 사용)
const pretendard = localFont({
  src: './fonts/Pretendard-Variable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gongzzang.com"),
  title: "공짱 | 산업부동산 통합 플랫폼",
  description: "매물·경매·실거래·분양 정보를 한눈에. 제조업에 필요한 모든 산업부동산 정보를 공짱에서 확인하세요.",
  keywords: ["산업부동산", "공장", "창고", "제조업", "부동산", "매물", "경매", "실거래가", "산업단지"],
  authors: [{ name: "공짱" }],
  creator: "공짱",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://gongzzang.com",
    siteName: "공짱",
    title: "공짱 | 산업부동산 통합 플랫폼",
    description: "매물·경매·실거래·분양 정보를 한눈에. 제조업에 필요한 모든 산업부동산 정보를 공짱에서 확인하세요.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "공짱 - 산업부동산 통합 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "공짱 | 산업부동산 통합 플랫폼",
    description: "매물·경매·실거래·분양 정보를 한눈에. 제조업에 필요한 모든 산업부동산 정보를 공짱에서 확인하세요.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={pretendard.variable}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
