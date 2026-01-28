import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

// Hanwha 폰트 패밀리
const hanwha = localFont({
  src: [
    {
      path: './fonts/Hanwha-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Hanwha-Regular.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Hanwha-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-hanwha',
  display: 'swap',
});

// HanwhaGothic 폰트 패밀리
const hanwhaGothic = localFont({
  src: [
    {
      path: './fonts/HanwhaGothic-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/HanwhaGothic-Regular.woff2',
      weight: '400 600',
      style: 'normal',
    },
  ],
  variable: '--font-hanwha-gothic',
  display: 'swap',
});

// Gmarket Sans 폰트 패밀리
const gmarketSans = localFont({
  src: [
    {
      path: './fonts/GmarketSans-Medium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/GmarketSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-gmarket-sans',
  display: 'swap',
});

// Pretendard 폰트
const pretendard = localFont({
  src: './fonts/Pretendard-Variable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "공짱 | 산업부동산 통합 플랫폼",
  description: "매물·경매·실거래·분양 정보를 한눈에. 제조업에 필요한 모든 산업부동산 정보를 공짱에서 확인하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${hanwha.variable} ${hanwhaGothic.variable} ${gmarketSans.variable} ${pretendard.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <ScrollToTop />
      </body>
    </html>
  );
}
