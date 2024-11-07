import { useState, useEffect } from 'react';
import styles from './HeroPowerModal.module.css';

type PlatformType = 'iqq' | 'iwx' | 'aqq' | 'awx';

interface Props {
    heroName: string;
    platform: PlatformType;
    onClose: () => void;
}

interface PowerData {
    name: string;
    platform: string;
    area: string;
    areaPower: string;
    city: string;
    cityPower: string;
    province: string;
    provincePower: string;
    guobiao: string;
    updatetime: string;
}

export function HeroPowerModal({ heroName, platform, onClose }: Props) {
    const [powerData, setPowerData] = useState<PowerData | null>(null);
    const [loading, setLoading] = useState(true);

    const platformNames: Record<PlatformType, string> = {
        iqq: 'iOS QQ',
        iwx: 'iOS 微信',
        aqq: '安卓 QQ',
        awx: '安卓 微信'
    };

    useEffect(() => {
        const fetchPowerData = async () => {
            try {
                const response = await fetch(
                    `https://api.xxoo.team/hero/getHeroInfo.php?hero=${encodeURIComponent(heroName)}&type=${platform}`
                );
                const data = await response.json();
                if (data.code === 200) {
                    setPowerData(data.data);
                }
            } catch (error) {
                console.error('获取战力数据失败:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPowerData();
    }, [heroName, platform]);

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h2>{heroName} - {platformNames[platform]}</h2>
                {loading ? (
                    <p>加载中...</p>
                ) : powerData ? (
                    <div className={styles.powerInfo}>
                        <div className={styles.powerItem}>
                            <div className={styles.powerLevel}>国标战力</div>
                            <div className={styles.powerValue}>{powerData.guobiao}</div>
                        </div>
                        
                        <div className={styles.powerItem}>
                            <div className={styles.powerLevel}>
                                省级战力 - {powerData.province}
                            </div>
                            <div className={styles.powerValue}>{powerData.provincePower}</div>
                        </div>

                        <div className={styles.powerItem}>
                            <div className={styles.powerLevel}>
                                市级战力 - {powerData.city}
                            </div>
                            <div className={styles.powerValue}>{powerData.cityPower}</div>
                        </div>

                        <div className={styles.powerItem}>
                            <div className={styles.powerLevel}>
                                区级战力 - {powerData.area}
                            </div>
                            <div className={styles.powerValue}>{powerData.areaPower}</div>
                        </div>

                        <div className={styles.updateTime}>
                            更新时间：{powerData.updatetime}
                        </div>
                    </div>
                ) : (
                    <p>获取数据失败</p>
                )}
            </div>
        </div>
    );
} 