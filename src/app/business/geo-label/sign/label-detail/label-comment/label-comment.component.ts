import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lb-label-comment',
  templateUrl: './label-comment.component.html',
  styleUrls: ['./label-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelCommentComponent implements OnInit {
  comentMesg: string = '评论信息内容';
  'topictrees' = [
    {
      topicid: '8908352c-49fb-c07f-41df-6a060a8497d6',
      tagid: '111d1a04-c0e6-483a-ae56-bf12f32e3346',
      content: '测试1',
      createby: '39f08cfd-8e0d-771b-a2f3-2639a62ca2fa',
      createaccount: 'account',
      createtime: '2021-01-12 09:35:09',
      children: [
        {
          topicid: 'bc9f9d94-e765-7d9e-2530-bb7c84fd8672',
          tagid: '111d1a04-c0e6-483a-ae56-bf12f32e3346',
          content: '回复测试1',
          createby: '39f6835b-2075-3e4b-c4ba-6a765c4f332d',
          createaccount: 'cfvisitor',
          createtime: '2021-01-12 10:17:26',
          children: [],
        },
        {
          topicid: '7bcbf5b8-0a19-543c-48d6-57cd677bd5d2',
          tagid: '111d1a04-c0e6-483a-ae56-bf12f32e3346',
          content: '回复测试1',
          createby: '39f85228-501e-2aaa-840a-eb089143c898',
          createaccount: 'peixh',
          createtime: '2021-01-12 11:14:35',
          children: [],
        },
      ],
    },
    {
      topicid: '2c9a2e29-353f-3a86-ad5e-1526b141b8c3',
      tagid: '111d1a04-c0e6-483a-ae56-bf12f32e3346',
      content: '测试2',
      createby: '39f85228-501e-2aaa-840a-eb089143c898',
      createaccount: 'peixh',
      createtime: '2021-01-12 10:36:22',
      children: [
        {
          topicid: '3c4c5b06-8cd3-6605-e68c-2591f20c18ae',
          tagid: '111d1a04-c0e6-483a-ae56-bf12f32e3346',
          content: '回复测试2',
          createby: '39f08cfd-8e0d-771b-a2f3-2639a62ca2fa',
          createaccount: 'account',
          createtime: '2021-01-12 11:15:33',
          children: [],
        },
      ],
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
