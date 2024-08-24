export interface Medal {
    totalMedals: number;
    gold: MedalData;
    bronze: MedalData;
    silver: MedalData;
}

export interface MedalData {
    medalNumberPerGrade: number;
    medalColor: string;
}