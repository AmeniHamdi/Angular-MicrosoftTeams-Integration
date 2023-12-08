export interface Body {
  contentType: string;
  content: string;
}

export interface EventDetail {
  '@odata.type': string;
  callId: string;
  callEventType: string;
  initiator: Initiator;
}

export interface Initiator {
  application: any | null;
  device: any | null;
  user: User;
}

export interface User {
  '@odata.type': string;
  id: string;
  displayName: string | null;
  userIdentityType: string;
}

export interface MeetingPolicyUpdatedEventMessageDetail extends EventDetail {
  '@odata.type': '#microsoft.graph.meetingPolicyUpdatedEventMessageDetail';
  meetingChatId: string;
  meetingChatEnabled: boolean;
  initiator: Initiator;
}

export interface CallStartedEventMessageDetail extends EventDetail {
  '@odata.type': '#microsoft.graph.callStartedEventMessageDetail';
  callId: string;
  callEventType: string;
  initiator: Initiator;
}

export interface CallEndedEventMessageDetail extends EventDetail {
  '@odata.type': '#microsoft.graph.callEndedEventMessageDetail';
  callId: string;
  callDuration: string;
  callEventType: string;
  callParticipants: CallParticipant[];
}

export interface CallParticipant {
  participant: Participant;
  mediaState: MediaState;
  microphoneMuted: boolean;
  speakerMuted: boolean;
  callOnHold: boolean;
}

export interface Participant {
  application: any | null;
  device: any | null;
  user: User;
}

export interface MediaState {
  audio: string;
  video: string;
}

export interface ChatMessage {
  id: string;
  replyToId: string | null;
  etag: string;
  messageType: string;
  createdDateTime: string;
  lastModifiedDateTime: string;
  lastEditedDateTime: string | null;
  deletedDateTime: string | null;
  subject: string | null;
  summary: string | null;
  chatId: string;
  importance: string;
  locale: string;
  webUrl: string | null;
  from: any | null;
  channelIdentity: any | null;
  policyViolation: any | null;
  body: Body;
  attachments: any[];
  mentions: any[];
  reactions: any[];
  eventDetail: EventDetail;
}

export interface ChatMessageResponse {
  '@odata.context': "https://graph.microsoft.com/v1.0/$metadata#chats('19%3Ameeting_MzlhNGNlNjMtODEwNy00YjIxLTgyZjYtOTFlMzZhNzI1ODUx%40thread.v2')/messages";
  '@odata.count': 11;
  value: [];
}
