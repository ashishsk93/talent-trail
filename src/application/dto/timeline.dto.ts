interface TimelineCreateDto {
  applicationId: number;
  event: string;
  status: string;
  when: Date;
}

interface TimelineUpdateDto {
  status: string;
  when: Date;
}

export { TimelineCreateDto, TimelineUpdateDto };
