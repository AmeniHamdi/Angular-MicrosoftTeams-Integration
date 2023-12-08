export interface Viewpoint {
  isHidden: boolean;
  lastMessageReadDateTime: string;
}

export interface Organizer {
  id: string;
  displayName: string | null;
  userIdentityType: string;
}

export interface OnlineMeetingInfo {
  calendarEventId: string;
  joinWebUrl: string;
  organizer: Organizer;
}

export interface Chat {
  id: string;
  topic: string | null;
  createdDateTime: string;
  lastUpdatedDateTime: string;
  chatType: string;
  webUrl: string;
  tenantId: string;
  viewpoint: Viewpoint;
  onlineMeetingInfo: OnlineMeetingInfo | null;
}

export interface ChatResponse {
  '@odata.context': string;
  '@odata.count': number;
  '@odata.nextLink': string;
  value: Chat[];
}
