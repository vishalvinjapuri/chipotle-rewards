export type Promotion = {
  PromotionCode: string;
  Campaign: string;
  PromotionName: string;
  PromotionDescription: string;
  TermsAndConditions: string;
  WebImage: string;
  WebThumb: string;
  MobileImage: string;
  MobileThumb: string;
  ExpirationDate: string;
  IsValid: boolean;
  InvalidReason?: string;
  ExpiringSoon: boolean;
  PromotionId: number;
  IsReusable: boolean;
  PromotionCampaignTags: string[];
  isUsed?: boolean;
} 