import { useEffect, useState, useMemo } from 'react';
import { Hero } from '../types/hero';
import { HeroPowerModal } from './HeroPowerModal';
import styles from './HeroList.module.css';

type PlatformType = 'aqq' | 'awx' | 'iqq' | 'iwx';
const PINNED_HEROES_KEY = 'pinnedHeroes'; // localStorage 的 key

export function HeroList() {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedHero, setSelectedHero] = useState<string | null>(null);
    const [platform, setPlatform] = useState<PlatformType>('iqq');
    const [searchTerm, setSearchTerm] = useState('');
    // 初始化时从 localStorage 读取置顶列表
    const [pinnedHeroes, setPinnedHeroes] = useState<number[]>(() => {
        const saved = localStorage.getItem(PINNED_HEROES_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    // 当置顶列表变化时，保存到 localStorage
    useEffect(() => {
        localStorage.setItem(PINNED_HEROES_KEY, JSON.stringify(pinnedHeroes));
    }, [pinnedHeroes]);

    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const response = await fetch('https://api.xxoo.team/hero/getHeroList.php');
                const data = await response.json();
                if (data.code === 200) {
                    setHeroes(data.data);
                }
            } catch (error) {
                console.error('获取英雄列表失败:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHeroes();
    }, []);

    const togglePin = (ename: number) => {
        setPinnedHeroes(prev => {
            const newPinned = prev.includes(ename)
                ? prev.filter(id => id !== ename)
                : [...prev, ename];
            return newPinned;
        });
    };

    const filteredAndSortedHeroes = useMemo(() => {
        return heroes
            .filter(hero => 
                hero.cname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hero.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                // 置顶的英雄排在前面
                const aIsPinned = pinnedHeroes.includes(a.ename);
                const bIsPinned = pinnedHeroes.includes(b.ename);
                if (aIsPinned && !bIsPinned) return -1;
                if (!aIsPinned && bIsPinned) return 1;
                return 0;
            });
    }, [heroes, searchTerm, pinnedHeroes]);

    if (loading) {
        return <div>加载中...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.platformSelector}>
                <div className={styles.radioGroup}>
                    <label className={platform === 'iqq' ? styles.active : ''}>
                        <input
                            type="radio"
                            name="platform"
                            value="iqq"
                            checked={platform === 'iqq'}
                            onChange={(e) => setPlatform(e.target.value as PlatformType)}
                        />
                        iOS QQ
                    </label>
                    <label className={platform === 'iwx' ? styles.active : ''}>
                        <input
                            type="radio"
                            name="platform"
                            value="iwx"
                            checked={platform === 'iwx'}
                            onChange={(e) => setPlatform(e.target.value as PlatformType)}
                        />
                        iOS 微信
                    </label>
                    <label className={platform === 'aqq' ? styles.active : ''}>
                        <input
                            type="radio"
                            name="platform"
                            value="aqq"
                            checked={platform === 'aqq'}
                            onChange={(e) => setPlatform(e.target.value as PlatformType)}
                        />
                        安卓 QQ
                    </label>
                    <label className={platform === 'awx' ? styles.active : ''}>
                        <input
                            type="radio"
                            name="platform"
                            value="awx"
                            checked={platform === 'awx'}
                            onChange={(e) => setPlatform(e.target.value as PlatformType)}
                        />
                        安卓 微信
                    </label>
                </div>
            </div>

            <div className={styles.searchBox}>
                <input
                    type="text"
                    placeholder="搜索英雄名称或称号..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.heroGrid}>
                {filteredAndSortedHeroes.map(hero => (
                    <div 
                        key={hero.ename} 
                        className={`${styles.heroCard} ${pinnedHeroes.includes(hero.ename) ? styles.pinned : ''}`}
                    >
                        <div className={styles.heroCardContent} onClick={() => setSelectedHero(hero.cname)}>
                            <img src={hero.iconUrl} alt={hero.cname} />
                            <h3>{hero.cname}</h3>
                            <p>{hero.title}</p>
                        </div>
                        <button 
                            className={styles.pinButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                togglePin(hero.ename);
                            }}
                        >
                            {pinnedHeroes.includes(hero.ename) ? '取消置顶' : '置顶'}
                        </button>
                    </div>
                ))}
            </div>
            
            {selectedHero && (
                <HeroPowerModal 
                    heroName={selectedHero}
                    platform={platform}
                    onClose={() => setSelectedHero(null)}
                />
            )}
        </div>
    );
} 