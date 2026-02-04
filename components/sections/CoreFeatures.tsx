'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightning,
  Barbell,
  CraneTower,
  Ruler,
  Factory,
  Buildings,
  House,
  Truck,
  Path,
  HouseLine,
  UsersThree,
  FolderOpen,
  Bell,
  ArrowsLeftRight,
  Check,
  Warning,
} from '@phosphor-icons/react';
import SectionHeader from '@/components/ui/SectionHeader';
import { FadeUp } from '@/components/ui/animations';
import styles from './CoreFeatures.module.css';

const featureTabs = [
  {
    id: 'data',
    label: '산업시설 데이터 분석',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2"/>
        <polyline points="3.27,6.96 12,12.01 20.73,6.96" stroke="currentColor" strokeWidth="2"/>
        <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    color: '#0071ff',
    features: [
      {
        name: '건축 스펙',
        title: '건축 구조 및 동력',
        description: '전력(kW), 바닥 하중, 호이스트 등 설비 가동에 필수적인 하드웨어 스펙을 상세히 제공합니다.',
        visualType: 'specs',
      },
      {
        name: '건물별 스펙',
        title: '건물별 개별 스펙 시스템',
        description: '뭉뚱그린 합계 면적이 아닌 제조동, 사무동, 가설건축물의 제원을 건물별로 분리하여 보여드립니다.',
        visualType: 'building',
      },
      {
        name: '차량 통행',
        title: '진입로 및 차량 통행 분석',
        description: '11톤 윙바디, 40피트 트레일러 등 대형 차량의 진입 가능 여부를 아이콘으로 즉시 확인하세요.',
        visualType: 'vehicle',
      },
      {
        name: '인프라',
        title: '광역 교통 & 인력 수급 인프라',
        description: '물류비를 아끼는 IC 접근성부터 직원 채용을 위한 배후 주거 환경까지 꼼꼼하게 분석해 드립니다.',
        visualType: 'traffic',
      },
      {
        name: '시세',
        title: '정밀한 산업부동산 시세',
        description: '공장과 창고를 명확히 구분하여, 데이터 왜곡 없는 순수 제조업소 실거래가를 제공합니다.',
        visualType: 'price',
      },
    ],
  },
  {
    id: 'map',
    label: '공간정보 시각화',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#0071ff',
    features: [
      {
        name: '통합 지도',
        title: '통합 지도 시스템',
        description: '매물, 건축물대장, 토지이용계획, 실거래가, 경매 정보까지 핀 하나로 통합하여 확인하세요.',
        visualType: 'mockup',
      },
      {
        name: '산단 브리핑',
        title: '산업단지 정밀 브리핑',
        description: '지도에 없는 산업단지 경계부터 입주 제한 업종, 입주 기업 리스트까지 정밀하게 브리핑합니다.',
        visualType: 'district',
      },
      {
        name: '시각화',
        title: '필지별 데이터 시각화',
        description: '실거래가와 노후도에 따라 필지 색상이 변하는 시각화 지도로, 숨겨진 알짜 매물을 직관적으로 찾아냅니다.',
        visualType: 'heatmap',
      },
      {
        name: '클러스터',
        title: '업종별 산업 클러스터',
        description: '금속, 화학 등 유사 업종이 밀집된 지역을 영역으로 시각화하여 산업 시너지를 확인하세요.',
        visualType: 'cluster',
      },
      {
        name: '지역 분석',
        title: '지역별 실시간 분석',
        description: '지도를 움직이면 보고 계신 지역의 시세·산업·인프라 분석 결과가 실시간으로 동기화됩니다.',
        visualType: 'realtime',
      },
    ],
  },
  {
    id: 'matching',
    label: '맞춤형 컨설팅',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#0071ff',
    features: [
      {
        name: '의뢰',
        title: '매도/매수 의뢰',
        description: '희망하시는 조건만 말씀해 주세요. 최적의 매수자를 매칭해 드리거나, 맞춤형 매물을 신속하게 연결해 드립니다.',
        visualType: 'request',
      },
      {
        name: '전문가',
        title: '원스톱 전문가 케어',
        description: '인허가 검토부터 매입·매각 전략 수립까지, 전담 전문가가 배정되어 A to Z를 완벽하게 케어합니다.',
        visualType: 'expert',
      },
      {
        name: '조건 저장',
        title: '필터 조건 저장',
        description: '자주 사용하는 필터 조건을 저장해두고, 언제든 불러와 사용하세요.',
        visualType: 'save',
        comingSoon: true,
      },
      {
        name: '알림',
        title: '조건 매칭 알림',
        description: '저장한 조건에 맞는 신규 매물이 등록되거나 정보가 업데이트되면 즉시 알람을 발송해 드립니다.',
        visualType: 'alert',
        comingSoon: true,
      },
    ],
  },
];

const specsData = [
  { Icon: Lightning, label: '전력', value: '500kW' },
  { Icon: Barbell, label: '바닥하중', value: '5t/㎡' },
  { Icon: CraneTower, label: '호이스트', value: '10t' },
  { Icon: Ruler, label: '천정고', value: '12m' },
];

const SpecsVisual = () => (
  <div className={styles.specsVisual}>
    <div className={styles.specsGrid}>
      {specsData.map((item) => (
        <div key={item.label} className={styles.specItem}>
          <item.Icon size={20} weight="duotone" className={styles.specIcon} />
          <span className={styles.specLabel}>{item.label}</span>
          <span className={styles.specValue}>{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const buildingsData = [
  { name: '제조동', area: '1,200평', Icon: Factory },
  { name: '사무동', area: '150평', Icon: Buildings },
  { name: '가설건축물', area: '80평', Icon: House },
];

const BuildingVisual = () => (
  <div className={styles.buildingVisual}>
    <div className={styles.buildingList}>
      {buildingsData.map((building, i) => (
        <div key={building.name} className={`${styles.buildingItem} ${i === 0 ? styles.buildingMain : ''}`}>
          <building.Icon size={18} weight="duotone" className={styles.buildingIcon} />
          <div className={styles.buildingInfo}>
            <span className={styles.buildingName}>{building.name}</span>
            <span className={styles.buildingArea}>{building.area}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const vehiclesData = [
  { name: '11톤 윙바디', status: 'ok' },
  { name: '25톤 카고', status: 'ok' },
  { name: '40ft 트레일러', status: 'warning' },
];

const VehicleVisual = () => (
  <div className={styles.vehicleVisual}>
    <div className={styles.vehicleList}>
      {vehiclesData.map((vehicle) => (
        <div key={vehicle.name} className={styles.vehicleItem}>
          <Truck size={18} weight="duotone" className={styles.vehicleIcon} />
          <span className={styles.vehicleName}>{vehicle.name}</span>
          <span className={`${styles.vehicleStatus} ${styles[vehicle.status]}`}>
            {vehicle.status === 'ok' ? <Check size={12} weight="bold" /> : <Warning size={12} weight="bold" />}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const trafficData = [
  { Icon: Path, label: 'IC 접근', value: '3.2km' },
  { Icon: HouseLine, label: '배후 주거', value: '양호' },
  { Icon: UsersThree, label: '인력 수급', value: '우수' },
];

const TrafficVisual = () => (
  <div className={styles.trafficVisual}>
    <div className={styles.trafficItems}>
      {trafficData.map((item) => (
        <div key={item.label} className={styles.trafficItem}>
          <item.Icon size={20} weight="duotone" className={styles.trafficIcon} />
          <span className={styles.trafficLabel}>{item.label}</span>
          <span className={styles.trafficValue}>{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const PriceVisual = () => (
  <div className={styles.priceVisual}>
    <div className={styles.priceChart}>
      <div className={styles.priceBar}>
        <span className={styles.priceLabel}>공장</span>
        <div className={styles.priceBarFill} style={{ width: '75%' }}>
          <span>180만/평</span>
        </div>
      </div>
      <div className={styles.priceBar}>
        <span className={styles.priceLabel}>창고</span>
        <div className={styles.priceBarFill} style={{ width: '55%' }}>
          <span>120만/평</span>
        </div>
      </div>
    </div>
  </div>
);

const MockupVisual = () => (
  <div className={styles.mockupVisual}>
    <div className={styles.mockupBrowser}>
      <div className={styles.mockupHeader}>
        <div className={styles.mockupDots}>
          <span /><span /><span />
        </div>
        <div className={styles.mockupUrl}>gongzzang.com</div>
      </div>
      <div className={styles.mockupContent}>
        <div className={styles.mockupSidebar}>
          <div className={styles.mockupFilter} />
          <div className={styles.mockupFilter} />
          <div className={styles.mockupFilter} />
        </div>
        <div className={styles.mockupMap}>
          <div className={styles.mockupMapPin} style={{ top: '25%', left: '35%' }} />
          <div className={styles.mockupMapPin} style={{ top: '45%', left: '55%' }} />
          <div className={styles.mockupMapPin} style={{ top: '65%', left: '40%' }} />
        </div>
      </div>
    </div>
  </div>
);

const DistrictVisual = () => (
  <div className={styles.districtVisual}>
    <div className={styles.districtMap}>
      <div className={styles.districtBoundary} />
      <div className={styles.districtInfo}>
        <span className={styles.districtName}>반월시화 산단</span>
        <div className={styles.districtMeta}>
          <span>제한업종: 화학</span>
          <span>입주기업: 1,240개</span>
        </div>
      </div>
    </div>
  </div>
);

const heatmapOpacities = [0.35, 0.65, 0.45, 0.78, 0.52, 0.28, 0.72, 0.41, 0.58, 0.32, 0.68, 0.48, 0.75, 0.38, 0.62, 0.55];

const HeatmapVisual = () => (
  <div className={styles.heatmapVisual}>
    <div className={styles.heatmapGrid}>
      {heatmapOpacities.map((opacity, i) => (
        <div
          key={i}
          className={styles.heatmapCell}
          style={{
            backgroundColor: `rgba(59, 130, 246, ${opacity})`,
          }}
        />
      ))}
    </div>
    <div className={styles.heatmapLegend}>
      <span>저렴</span>
      <div className={styles.heatmapScale} />
      <span>고가</span>
    </div>
  </div>
);

const ClusterVisual = () => (
  <div className={styles.clusterVisual}>
    <div className={styles.clusterMap}>
      <div className={styles.clusterArea} style={{ '--cluster-color': '#0071ff' } as React.CSSProperties}>
        <span>금속</span>
      </div>
      <div className={styles.clusterArea} style={{ '--cluster-color': '#3b82f6' } as React.CSSProperties}>
        <span>화학</span>
      </div>
      <div className={styles.clusterArea} style={{ '--cluster-color': '#2563eb' } as React.CSSProperties}>
        <span>기계</span>
      </div>
    </div>
  </div>
);

const RealtimeVisual = () => (
  <div className={styles.realtimeVisual}>
    <div className={styles.realtimeMap}>
      <div className={styles.realtimeCursor} />
    </div>
    <div className={styles.realtimePanel}>
      <div className={styles.realtimeItem}>
        <span>평균시세</span>
        <span className={styles.realtimeValue}>185만/평</span>
      </div>
      <div className={styles.realtimeItem}>
        <span>매물수</span>
        <span className={styles.realtimeValue}>127건</span>
      </div>
    </div>
  </div>
);

const RequestVisual = () => (
  <div className={styles.requestVisual}>
    <div className={styles.requestFlow}>
      <div className={styles.requestNode}>
        <span>매도자</span>
      </div>
      <div className={styles.requestArrow}>
        <ArrowsLeftRight size={16} weight="bold" />
      </div>
      <div className={styles.requestCenter}>
        <span>공짱</span>
      </div>
      <div className={styles.requestArrow}>
        <ArrowsLeftRight size={16} weight="bold" />
      </div>
      <div className={styles.requestNode}>
        <span>매수자</span>
      </div>
    </div>
  </div>
);

const ExpertVisual = () => (
  <div className={styles.expertVisual}>
    <div className={styles.expertTimeline}>
      {['인허가 검토', '전략 수립', '계약 체결', '사후 관리'].map((step, i) => (
        <div key={step} className={`${styles.expertStep} ${i <= 1 ? styles.expertDone : ''}`}>
          <div className={styles.expertDot} />
          <span>{step}</span>
        </div>
      ))}
    </div>
  </div>
);

const saveData = ['경기 화성 · 500평 이상', '충북 청주 · 제조업', '인천 · 물류창고'];

const SaveVisual = () => (
  <div className={styles.saveVisual}>
    <div className={styles.saveStack}>
      {saveData.map((text, i) => (
        <div key={text} className={`${styles.saveItem} ${i === 0 ? styles.saveItemActive : ''}`}>
          <FolderOpen size={16} weight="duotone" className={styles.saveIcon} />
          <span className={styles.saveText}>{text}</span>
        </div>
      ))}
    </div>
  </div>
);

const AlertVisual = () => (
  <div className={styles.alertVisual}>
    <div className={styles.alertPhone}>
      <div className={styles.alertNotification}>
        <div className={styles.alertHeader}>
          <Bell size={16} weight="fill" className={styles.alertIcon} />
          <span className={styles.alertTitle}>새 매물 알림</span>
        </div>
        <p className={styles.alertMessage}>저장한 조건에 맞는 매물이 등록되었습니다</p>
      </div>
    </div>
  </div>
);

const renderVisual = (type: string) => {
  switch (type) {
    case 'specs': return <SpecsVisual />;
    case 'building': return <BuildingVisual />;
    case 'vehicle': return <VehicleVisual />;
    case 'traffic': return <TrafficVisual />;
    case 'price': return <PriceVisual />;
    case 'mockup': return <MockupVisual />;
    case 'district': return <DistrictVisual />;
    case 'heatmap': return <HeatmapVisual />;
    case 'cluster': return <ClusterVisual />;
    case 'realtime': return <RealtimeVisual />;
    case 'save': return <SaveVisual />;
    case 'alert': return <AlertVisual />;
    case 'request': return <RequestVisual />;
    case 'expert': return <ExpertVisual />;
    default: return null;
  }
};

export default function CoreFeatures() {
  const [activeTab, setActiveTab] = useState(featureTabs[0].id);
  const currentTab = featureTabs.find(t => t.id === activeTab) ?? featureTabs[0];

  return (
    <section id="section-core-features" className={styles.section}>
      <div className={styles.container}>
        <FadeUp>
          <SectionHeader
            sectionName="Core Features"
            sectionNumber="02"
            description="흩어진 공공데이터와 현장의 엔지니어링 스펙을 통합하고, 공짱만의 기술로 가장 완벽한 해답을 제시합니다."
          >
            그래서 공짱은, 제조업의 기준에 맞춰<br />
            모든 정보를 다시 정의했습니다.
          </SectionHeader>
        </FadeUp>

        <div className={styles.tabNav}>
          {featureTabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ '--tab-color': tab.color } as React.CSSProperties}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className={styles.bentoGrid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentTab.features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className={`${styles.bentoCard} ${feature.comingSoon ? styles.comingSoonCard : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
              >
                {feature.comingSoon && (
                  <span className={styles.comingSoonBadge}>Coming Soon</span>
                )}
                <div className={styles.bentoVisual}>
                  {renderVisual(feature.visualType)}
                </div>
                <div className={styles.bentoContent}>
                  <h3 className={styles.bentoTitle}>{feature.title}</h3>
                  <p className={styles.bentoDescription}>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
