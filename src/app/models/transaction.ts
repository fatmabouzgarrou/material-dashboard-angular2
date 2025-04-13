export interface Transaction {
    id: number;
    reference: string;
    totalAmount: number;
    transferredAmount: number;
    blockedAmount: number;
    openDate: string;
    valueDate: string;
    authorizationDate: string;
    motif: string;
    bctAuthorizationNumber: string;
    operationMotif: string;
    orderType: string;
    status: string;
    permanent: boolean;
    multiple: boolean;
    commercial: boolean;
    financing: boolean;
    feeAmount: number;
    blockedFeeAmount: number;
    feeType: string;
    senderClientId: number;
    beneficiaryClientId: number;
    correspondingBankId: number;
    intermediaryBankId: number;
    beneficiaryBankId: number;
    currencyId: number;
    country?: string; // Optionnel, à ajouter si vous modifiez le backend
    riskLevel?: string; // Optionnel, à ajouter si vous modifiez le backend
  }