import type { StoryNode } from '../engine/types';

export const STORY_NODES: StoryNode[] = [
  // ===== START & CHAPTER 1 =====
  { id: 'start', type: 'background', bg: 'convenience_night', bgm: 'night', next: 'ch1_001' },
  { id: 'ch1_001', type: 'narration', text: '凌川的夏天总是很长。长到足够让人误以为，某些东西永远不会消失。', next: 'ch1_002' },
  { id: 'ch1_002', type: 'narration', text: '高考结束后的第一个夜晚，我在母亲的便利店里值夜班。空调嗡嗡响，冰柜发出稳定的低鸣。', next: 'ch1_003' },
  { id: 'ch1_003', type: 'dialogue', speaker: 'linmu', text: '困了就趴一会儿，妈来换班。', next: 'ch1_004', expression: 'gentle' },
  { id: 'ch1_004', type: 'dialogue', speaker: 'linche', text: '没事，反正我也睡不着。', next: 'ch1_005' },
  { id: 'ch1_005', type: 'dialogue', speaker: 'linmu', text: '你爸又打电话来了？', next: 'ch1_006', expression: 'gentle' },
  { id: 'ch1_006', type: 'dialogue', speaker: 'linche', text: '嗯。他说大城市的机会多，让我别在小城耗着。', next: 'ch1_007', expression: 'neutral' },
  { id: 'ch1_007', type: 'narration', text: '母亲没再说话，只是把过期的饭团标签重新贴好。我知道她在听，也在等我自己想明白。', next: 'ch1_008' },
  { id: 'ch1_008', type: 'effect', changes: { chapter: 1 }, next: 'ch1_009' },
  { id: 'ch1_009', type: 'narration', text: '午夜零点，风铃响了。', next: 'ch1_010' },
  { id: 'ch1_010', type: 'show', character: 'baichuan', expression: 'neutral', position: 'center', next: 'ch1_011' },
  { id: 'ch1_011', type: 'dialogue', speaker: 'baichuan', text: '还有营业吗？', next: 'ch1_012', expression: 'neutral' },
  { id: 'ch1_012', type: 'dialogue', speaker: 'linche', text: '24小时。你要什么？', next: 'ch1_013' },
  { id: 'ch1_013', type: 'dialogue', speaker: 'baichuan', text: '那瓶没有标签的汽水。就在最下面那层。', next: 'ch1_014', expression: 'smile' },
  { id: 'ch1_014', type: 'narration', text: '我愣了一下——冰柜里确实有一瓶透明汽水，标签被撕掉了，像是很久以前就放在那里。', next: 'ch1_015' },
  { id: 'ch1_015', type: 'dialogue', speaker: 'baichuan', text: '你今天已经见过我一次了，只是你忘了。', next: 'ch1_choice1', expression: 'gentle' },

  // Choice 1
  {
    id: 'ch1_choice1',
    type: 'choice',
    choices: [
      { text: '「那你欠我一次自我介绍。」', next: 'ch1_c1a', changes: { affection: { baichuan: 1 }, attitude: { face: 1 } } },
      { text: '「别拿都市传说吓便利店夜班。」', next: 'ch1_c1b', changes: { attitude: { escape: 1 } } },
      { text: '「你是不是身体不舒服？」', next: 'ch1_c1c', changes: { affection: { baichuan: 1 } } },
    ],
  },
  { id: 'ch1_c1a', type: 'dialogue', speaker: 'baichuan', text: '白川音。记住名字的话，也许明天还能再见面。', next: 'ch1_016', expression: 'smile' },
  { id: 'ch1_c1b', type: 'dialogue', speaker: 'baichuan', text: '都市传说也需要有人值班嘛。', next: 'ch1_016', expression: 'neutral' },
  { id: 'ch1_c1c', type: 'dialogue', speaker: 'baichuan', text: '我很好。比看起来好。', next: 'ch1_016', expression: 'gentle' },

  { id: 'ch1_016', type: 'narration', text: '她付完钱，推门离开。风铃的余音在空荡的便利店里荡了很久。', next: 'ch1_017' },
  { id: 'ch1_017', type: 'hide', character: 'baichuan', next: 'ch1_018' },
  { id: 'ch1_018', type: 'narration', text: '第二天清晨，我整理收银台时，发现下面压着一张旧天文馆门票。', next: 'ch1_019' },
  { id: 'ch1_019', type: 'narration', text: '日期是十年前。票面印着「凌川天文馆·流星雨特别场」。', next: 'ch1_choice2' },

  // Choice 2
  {
    id: 'ch1_choice2',
    type: 'choice',
    choices: [
      { text: '收好门票，去旧天文馆看看。', next: 'ch1_c2a', changes: { affection: { weiyang: 1 }, attitude: { face: 1 }, flags: { checked_ticket: true } } },
      { text: '当作恶作剧，随手扔进抽屉。', next: 'ch1_c2b', changes: { attitude: { escape: 1 } } },
      { text: '问母亲有没有见过这个客人。', next: 'ch1_c2c', changes: { affection: { baichuan: 1 }, attitude: { face: 1 } } },
    ],
  },
  { id: 'ch1_c2a', type: 'narration', text: '我把门票放进口袋。不知道为什么，指尖有点发凉。', next: 'ch1_end' },
  { id: 'ch1_c2b', type: 'narration', text: '抽屉关上的时候，我听见自己松了口气。有些问题，不问比较轻松。', next: 'ch1_end' },
  { id: 'ch1_c2c', type: 'dialogue', speaker: 'linmu', text: '白外套？没印象。不过 lately 半夜来的客人，妈也记不清了。', next: 'ch1_end', expression: 'gentle' },

  { id: 'ch1_end', type: 'narration', text: '—— 第1章《便利店的午夜客人》结束 ——', next: 'ch2_start' },

  // ===== CHAPTER 2 =====
  { id: 'ch2_start', type: 'background', bg: 'classroom_sunset', bgm: 'day', next: 'ch2_001' },
  { id: 'ch2_001', type: 'effect', changes: { chapter: 2 }, next: 'ch2_002' },
  { id: 'ch2_002', type: 'narration', text: '学校组织毕业生整理资料。空荡的走廊里，夕阳把灰尘照成金色。', next: 'ch2_003' },
  { id: 'ch2_003', type: 'show', character: 'zhouyuan', expression: 'smile', position: 'left', next: 'ch2_004' },
  { id: 'ch2_004', type: 'dialogue', speaker: 'zhouyuan', text: '你昨晚又守店？眼圈都青了。', next: 'ch2_005' },
  { id: 'ch2_005', type: 'dialogue', speaker: 'linche', text: '遇到个奇怪的客人。', next: 'ch2_006' },
  { id: 'ch2_006', type: 'dialogue', speaker: 'zhouyuan', text: '奇怪到什么程度？', next: 'ch2_007', expression: 'surprised' },
  { id: 'ch2_007', type: 'dialogue', speaker: 'linche', text: '她说我见过她，但我忘了。', next: 'ch2_008' },
  { id: 'ch2_008', type: 'dialogue', speaker: 'zhouyuan', text: '……你确定不是搭讪新套路？', next: 'ch2_009', expression: 'smile' },
  { id: 'ch2_009', type: 'narration', text: '我没接话。走廊尽头，天文社的旧活动室门半开着。', next: 'ch2_010' },
  { id: 'ch2_010', type: 'hide', character: 'zhouyuan', next: 'ch2_011' },
  { id: 'ch2_011', type: 'show', character: 'weiyang', expression: 'neutral', position: 'center', next: 'ch2_012' },
  { id: 'ch2_012', type: 'dialogue', speaker: 'weiyang', text: '林澈。', next: 'ch2_013' },
  { id: 'ch2_013', type: 'dialogue', speaker: 'linche', text: '未央？你还在整理天文社的东西？', next: 'ch2_014' },
  { id: 'ch2_014', type: 'dialogue', speaker: 'weiyang', text: '天文馆下个月就要拆了。想在拆除前，再办一次小型观星会。', next: 'ch2_015', expression: 'gentle' },
  { id: 'ch2_015', type: 'dialogue', speaker: 'weiyang', text: '最后一次，把星星还给大家。', next: 'ch2_016', expression: 'sad' },
  { id: 'ch2_016', type: 'show', character: 'zhixia', expression: 'serious', position: 'right', next: 'ch2_017' },
  { id: 'ch2_017', type: 'dialogue', speaker: 'zhixia', text: '观星会？旧天文馆的设备早就不行了。', next: 'ch2_018' },
  { id: 'ch2_018', type: 'dialogue', speaker: 'zhixia', text: '林澈，别再把时间浪费在注定留不住的东西上。', next: 'ch2_choice3' },

  // Choice 3
  {
    id: 'ch2_choice3',
    type: 'choice',
    choices: [
      { text: '「观星会需要帮忙吗？我可以。」', next: 'ch2_c3a', changes: { affection: { weiyang: 2 }, attitude: { face: 1 }, flags: { agreed_stargazing: true } } },
      { text: '「也许吧……但我得先想想。」', next: 'ch2_c3b', changes: { affection: { weiyang: 1 }, attitude: { escape: 1 } } },
      { text: '「知夏说得对，反正要拆。」', next: 'ch2_c3c', changes: { affection: { weiyang: -1, zhixia: 1 }, attitude: { escape: 1 } } },
    ],
  },
  { id: 'ch2_c3a', type: 'dialogue', speaker: 'weiyang', text: '……谢谢。', next: 'ch2_choice4', expression: 'smile' },
  { id: 'ch2_c3b', type: 'dialogue', speaker: 'weiyang', text: '嗯。不着急。', next: 'ch2_choice4', expression: 'neutral' },
  { id: 'ch2_c3c', type: 'dialogue', speaker: 'weiyang', text: '……也是。', next: 'ch2_choice4', expression: 'sad' },

  // Choice 4
  {
    id: 'ch2_choice4',
    type: 'choice',
    choices: [
      { text: '「那我们就先把能做的做完。」', next: 'ch2_c4a', changes: { affection: { zhixia: 2 }, attitude: { face: 1 } } },
      { text: '「人总得相信点什么吧。」', next: 'ch2_c4b', changes: { affection: { weiyang: 1 } } },
      { text: '「你说得对，别折腾了。」', next: 'ch2_c4c', changes: { affection: { zhixia: -1 }, attitude: { escape: 1 } } },
    ],
  },
  { id: 'ch2_c4a', type: 'dialogue', speaker: 'zhixia', text: '……你倒是比我想的靠谱。', next: 'ch2_019', expression: 'neutral' },
  { id: 'ch2_c4b', type: 'dialogue', speaker: 'zhixia', text: '相信不能当饭吃。', next: 'ch2_019', expression: 'serious' },
  { id: 'ch2_c4c', type: 'dialogue', speaker: 'zhixia', text: '这才像句人话。', next: 'ch2_019', expression: 'neutral' },

  { id: 'ch2_019', type: 'narration', text: '窗外传来施工队的声音。凌川正在改造，旧天文馆和这条街，都在名单上。', next: 'ch2_020' },
  { id: 'ch2_020', type: 'dialogue', speaker: 'weiyang', text: '小时候，我们也看过一次流星雨。你记得吗？', next: 'ch2_021', expression: 'gentle' },
  { id: 'ch2_021', type: 'dialogue', speaker: 'linche', text: '……好像有印象。', next: 'ch2_022', expression: 'sad' },
  { id: 'ch2_022', type: 'dialogue', speaker: 'weiyang', text: '你忘了也没关系。', next: 'ch2_023', expression: 'gentle' },
  { id: 'ch2_023', type: 'narration', text: '她说「没关系」的时候，目光却移开了。', next: 'ch2_end' },
  { id: 'ch2_end', type: 'narration', text: '—— 第2章《天文馆拆除通知》结束 ——', next: 'ch3_start' },

  // ===== CHAPTER 3 =====
  { id: 'ch3_start', type: 'background', bg: 'rain_street', bgm: 'rain', next: 'ch3_001' },
  { id: 'ch3_001', type: 'effect', changes: { chapter: 3 }, next: 'ch3_002' },
  { id: 'ch3_002', type: 'hide', character: 'weiyang', next: 'ch3_003' },
  { id: 'ch3_003', type: 'hide', character: 'zhixia', next: 'ch3_004' },
  { id: 'ch3_004', type: 'narration', text: '雷雨夜。便利店突然停电。', next: 'ch3_005' },
  { id: 'ch3_005', type: 'dialogue', speaker: 'linmu', text: '我去后面看电闸。你守着店。', next: 'ch3_006', expression: 'gentle' },
  { id: 'ch3_006', type: 'narration', text: '黑暗里，只有应急灯微弱地亮着。我走出便利店，雨水打在脸上。', next: 'ch3_007' },
  { id: 'ch3_007', type: 'background', bg: 'planetarium_old', bgm: 'tension', next: 'ch3_008' },
  { id: 'ch3_008', type: 'narration', text: '旧天文馆门口，我看见了三个不同版本的自己。', next: 'ch3_009' },
  { id: 'ch3_009', type: 'narration', text: '一个追着未央去了车站。一个陪知夏留在教室。一个和白川音走进了天文馆地下室。', next: 'ch3_choice5' },

  // Choice 5
  {
    id: 'ch3_choice5',
    type: 'choice',
    choices: [
      { text: '追上去，问那个「追未央的自己」发生了什么。', next: 'ch3_c5a', changes: { affection: { weiyang: 2 }, attitude: { face: 1 }, flags: { saw_weiyang_shadow: true } } },
      { text: '走向「陪知夏的自己」，想看清教室里的场景。', next: 'ch3_c5b', changes: { affection: { zhixia: 2 }, attitude: { face: 1 }, flags: { saw_zhixia_shadow: true } } },
      { text: '跟着「和白川音的自己」进入地下室。', next: 'ch3_c5c', changes: { affection: { baichuan: 2 }, attitude: { face: 1 }, flags: { saw_baichuan_shadow: true } } },
    ],
  },
  { id: 'ch3_c5a', type: 'narration', text: '影子回头看了我一眼，嘴唇动了动，像在说「别迟到」。然后消失在雨里。', next: 'ch3_010' },
  { id: 'ch3_c5b', type: 'narration', text: '教室的窗户里，知夏在哭。我想靠近，影子却先一步关上了门。', next: 'ch3_010' },
  { id: 'ch3_c5c', type: 'narration', text: '地下室的门缝里透出蓝光。白川音的声音传来：「你终于来了。」', next: 'ch3_010' },

  { id: 'ch3_010', type: 'narration', text: '雷声炸响。我猛地睁开眼——', next: 'ch3_011' },
  { id: 'ch3_011', type: 'background', bg: 'convenience_night', bgm: 'night', next: 'ch3_012' },
  { id: 'ch3_012', type: 'narration', text: '便利店恢复供电。母亲问我怎么了，我说做了个梦。', next: 'ch3_013' },
  { id: 'ch3_013', type: 'show', character: 'zhouyuan', expression: 'neutral', position: 'left', next: 'ch3_014' },
  { id: 'ch3_014', type: 'dialogue', speaker: 'zhouyuan', text: '你发什么消息？说昨晚下暴雨？', next: 'ch3_015' },
  { id: 'ch3_015', type: 'dialogue', speaker: 'linche', text: '难道没下吗？', next: 'ch3_016', expression: 'surprised' },
  { id: 'ch3_016', type: 'dialogue', speaker: 'zhouyuan', text: '凌川这几天一滴雨都没有。你睡糊涂了吧。', next: 'ch3_017' },
  { id: 'ch3_017', type: 'narration', text: '只有我记得。那个没有发生过的雨天。', next: 'ch3_end' },
  { id: 'ch3_end', type: 'hide', character: 'zhouyuan', next: 'ch4_start' },

  // ===== CHAPTER 4 =====
  { id: 'ch4_start', type: 'background', bg: 'school_hallway', bgm: 'day', next: 'ch4_001' },
  { id: 'ch4_001', type: 'effect', changes: { chapter: 4 }, next: 'ch4_002' },
  { id: 'ch4_002', type: 'narration', text: '三位女生几乎在同一天找到了我。', next: 'ch4_003' },
  { id: 'ch4_003', type: 'show', character: 'weiyang', expression: 'neutral', position: 'left', next: 'ch4_004' },
  { id: 'ch4_004', type: 'dialogue', speaker: 'weiyang', text: '旧星象仪还能修。我需要有人帮我。', next: 'ch4_005' },
  { id: 'ch4_005', type: 'show', character: 'zhixia', expression: 'serious', position: 'center', next: 'ch4_006' },
  { id: 'ch4_006', type: 'dialogue', speaker: 'zhixia', text: '后天有自主招生面试。我想请你陪练。', next: 'ch4_007' },
  { id: 'ch4_007', type: 'show', character: 'baichuan', expression: 'smile', position: 'right', next: 'ch4_008' },
  { id: 'ch4_008', type: 'dialogue', speaker: 'baichuan', text: '午夜来天文馆地下层。就我们两个。', next: 'ch4_009' },
  { id: 'ch4_009', type: 'dialogue', speaker: 'linche', text: '……你们商量好的？', next: 'ch4_choice6', expression: 'surprised' },

  // Choice 6 - Main route split
  {
    id: 'ch4_choice6',
    type: 'choice',
    choices: [
      { text: '答应未央，修旧星象仪。', next: 'ch4_weiyang', changes: { affection: { weiyang: 3 }, route: 'weiyang', flags: { chose_weiyang: true } } },
      { text: '陪知夏准备面试。', next: 'ch4_zhixia', changes: { affection: { zhixia: 3 }, route: 'zhixia', flags: { chose_zhixia: true } } },
      { text: '午夜陪白川音去地下层。', next: 'ch4_baichuan', changes: { affection: { baichuan: 3 }, route: 'baichuan', flags: { chose_baichuan: true } } },
    ],
  },

  // Route倾向 scenes
  { id: 'ch4_weiyang', type: 'dialogue', speaker: 'weiyang', text: '螺丝和润滑油我准备好了。你……真的愿意？', next: 'ch4_weiyang2', expression: 'smile' },
  { id: 'ch4_weiyang2', type: 'dialogue', speaker: 'linche', text: '认真问一句——还需要什么工具？', next: 'ch4_weiyang3' },
  { id: 'ch4_weiyang3', type: 'effect', changes: { affection: { weiyang: 1 }, attitude: { face: 1 } }, next: 'ch4_merge' },
  { id: 'ch4_zhixia', type: 'dialogue', speaker: 'zhixia', text: '别误会。我只是需要一个会提问的人。', next: 'ch4_zhixia2', expression: 'neutral' },
  { id: 'ch4_zhixia2', type: 'dialogue', speaker: 'linche', text: '行。什么时候开始？', next: 'ch4_zhixia3' },
  { id: 'ch4_zhixia3', type: 'effect', changes: { affection: { zhixia: 1 }, attitude: { face: 1 } }, next: 'ch4_merge' },
  { id: 'ch4_baichuan', type: 'dialogue', speaker: 'baichuan', text: '别告诉其他人。这是「第八天」的入口。', next: 'ch4_baichuan2', expression: 'gentle' },
  { id: 'ch4_baichuan2', type: 'dialogue', speaker: 'linche', text: '第八天？', next: 'ch4_merge', expression: 'surprised' },

  { id: 'ch4_merge', type: 'narration', text: '夏天的倒计时，从这一天开始加速。', next: 'ch4_end' },
  { id: 'ch4_end', type: 'narration', text: '—— 第4章《选择题不会只有四个选项》结束 ——', next: 'ch5_start' },

  // ===== CHAPTER 5 =====
  { id: 'ch5_start', type: 'background', bg: 'convenience_day', bgm: 'day', next: 'ch5_001' },
  { id: 'ch5_001', type: 'effect', changes: { chapter: 5 }, next: 'ch5_002' },
  { id: 'ch5_002', type: 'hide', character: 'weiyang', next: 'ch5_003' },
  { id: 'ch5_003', type: 'hide', character: 'zhixia', next: 'ch5_004' },
  { id: 'ch5_004', type: 'hide', character: 'baichuan', next: 'ch5_005' },
  { id: 'ch5_005', type: 'narration', text: '拆迁日期提前了。通知贴在便利店门口，像一张来不及拒绝的请柬。', next: 'ch5_006' },
  { id: 'ch5_006', type: 'show', character: 'linmu', expression: 'gentle', position: 'center', next: 'ch5_007' },
  { id: 'ch5_007', type: 'dialogue', speaker: 'linmu', text: '店……大概要关了。', next: 'ch5_choice7' },

  // Choice 7
  {
    id: 'ch5_choice7',
    type: 'choice',
    choices: [
      { text: '默默帮她整理旧货架。', next: 'ch5_c7a', changes: { attitude: { face: 1 } } },
      { text: '假装没听见，继续擦柜台。', next: 'ch5_c7b', changes: { attitude: { escape: 2 } } },
      { text: '「妈，关店以后你想做什么？」', next: 'ch5_c7c', changes: { attitude: { face: 2 } } },
    ],
  },
  { id: 'ch5_c7a', type: 'dialogue', speaker: 'linmu', text: '你这孩子……', next: 'ch5_008', expression: 'gentle' },
  { id: 'ch5_c7b', type: 'narration', text: '母亲没再重复。安静比任何责备都更重。', next: 'ch5_008' },
  { id: 'ch5_c7c', type: 'dialogue', speaker: 'linmu', text: '也许开个小书店。卖别人不想卖的书。', next: 'ch5_008', expression: 'smile' },

  { id: 'ch5_008', type: 'narration', text: '我意识到自己一直在逃避——逃避离别，逃避告白，逃避长大。', next: 'ch5_choice8' },

  // Choice 8
  {
    id: 'ch5_choice8',
    type: 'choice',
    choices: [
      { text: '主动去找未央，问观星会的进展。', next: 'ch5_c8a', changes: { affection: { weiyang: 2 }, attitude: { face: 1 } } },
      { text: '去学校找知夏，确认面试准备。', next: 'ch5_c8b', changes: { affection: { zhixia: 2 }, attitude: { face: 1 } } },
      { text: '留在便利店等白川音出现。', next: 'ch5_c8c', changes: { affection: { baichuan: 2 }, attitude: { face: 1 } } },
    ],
  },
  { id: 'ch5_c8a', type: 'show', character: 'weiyang', expression: 'gentle', position: 'center', next: 'ch5_c8a_d' },
  { id: 'ch5_c8a_d', type: 'dialogue', speaker: 'weiyang', text: '星象仪修好了大半。观星会定在三天后。', next: 'ch5_merge' },
  { id: 'ch5_c8b', type: 'show', character: 'zhixia', expression: 'neutral', position: 'center', next: 'ch5_c8b_d' },
  { id: 'ch5_c8b_d', type: 'dialogue', speaker: 'zhixia', text: 'Interview Questions 我整理好了。谢谢你愿意来。', next: 'ch5_merge' },
  { id: 'ch5_c8c', type: 'show', character: 'baichuan', expression: 'smile', position: 'center', next: 'ch5_c8c_d' },
  { id: 'ch5_c8c_d', type: 'dialogue', speaker: 'baichuan', text: '你等了多久？', next: 'ch5_c8c_d2' },
  { id: 'ch5_c8c_d2', type: 'dialogue', speaker: 'linche', text: '从关店通知贴出来开始。', next: 'ch5_merge' },

  { id: 'ch5_merge', type: 'narration', text: '观星会前夜，所有记忆残影开始集中爆发。', next: 'ch5_end' },
  { id: 'ch5_end', type: 'narration', text: '—— 第5章《夏天的倒计时》结束 ——', next: 'ch6_start' },

  // ===== CHAPTER 6 =====
  { id: 'ch6_start', type: 'background', bg: 'rooftop_stars', bgm: 'stars', next: 'ch6_001' },
  { id: 'ch6_001', type: 'effect', changes: { chapter: 6 }, next: 'ch6_002' },
  { id: 'ch6_002', type: 'hide', character: 'weiyang', next: 'ch6_003' },
  { id: 'ch6_003', type: 'hide', character: 'zhixia', next: 'ch6_004' },
  { id: 'ch6_004', type: 'hide', character: 'baichuan', next: 'ch6_005' },
  { id: 'ch6_005', type: 'hide', character: 'linmu', next: 'ch6_006' },
  { id: 'ch6_006', type: 'narration', text: '午夜将近。手机上的时间跳到 23:59。', next: 'ch6_007' },
  { id: 'ch6_007', type: 'narration', text: '我必须选择相信谁、陪谁度过这最后一个零点。', next: 'ch6_choice9' },

  // Choice 9 - Final route
  {
    id: 'ch6_choice9',
    type: 'choice',
    choices: [
      { text: '去天文馆屋顶找未央。', next: 'route_weiyang_start', changes: { route: 'weiyang' } },
      { text: '去学校教室找知夏。', next: 'route_zhixia_start', changes: { route: 'zhixia' } },
      { text: '留在便利店等白川音。', next: 'route_baichuan_start', changes: { route: 'baichuan' } },
      {
        text: '把所有人都叫来。',
        next: 'route_true_start',
        changes: { route: 'true' },
        condition: { unlockedEndings: ['ending_weiyang_good', 'ending_zhixia_good', 'ending_baichuan_good'], minFace: 8, maxEscape: 3 },
      },
    ],
  },

  // ===== WEIYANG ROUTE =====
  { id: 'route_weiyang_start', type: 'background', bg: 'planetarium_old', bgm: 'stars', next: 'wy_001' },
  { id: 'wy_001', type: 'effect', changes: { route: 'weiyang' }, next: 'wy_002' },
  { id: 'wy_002', type: 'show', character: 'weiyang', expression: 'neutral', position: 'center', next: 'wy_003' },
  { id: 'wy_003', type: 'dialogue', speaker: 'weiyang', text: '你来了。', next: 'wy_004' },
  { id: 'wy_004', type: 'dialogue', speaker: 'linche', text: '星象仪怎么样了？', next: 'wy_005' },
  { id: 'wy_005', type: 'dialogue', speaker: 'weiyang', text: '今晚应该能亮。最后一次。', next: 'wy_006', expression: 'gentle' },
  { id: 'wy_006', type: 'narration', text: '我们并肩修好了最后一处电路。旧星象仪发出低沉的嗡鸣，穹顶上映出一片人造星空。', next: 'wy_007' },
  { id: 'wy_007', type: 'dialogue', speaker: 'weiyang', text: '小时候，我们约定过——如果有一天都要离开，就在同一片星空下重新认识。', next: 'wy_008', expression: 'sad' },
  { id: 'wy_008', type: 'dialogue', speaker: 'linche', text: '你……一直记得？', next: 'wy_009', expression: 'surprised' },
  { id: 'wy_009', type: 'dialogue', speaker: 'weiyang', text: '记得。但我不想用旧约定绑住你。', next: 'wy_choice10' },

  {
    id: 'wy_choice10',
    type: 'choice',
    choices: [
      { text: '「我喜欢你。谢谢你一直记得。」', next: 'wy_good_path', changes: { affection: { weiyang: 3 }, attitude: { face: 2 }, flags: { weiyang_confessed: true } } },
      { text: '「约定什么的，太沉重了。」', next: 'wy_bad_path', changes: { attitude: { escape: 2 } } },
    ],
  },

  { id: 'wy_good_path', type: 'dialogue', speaker: 'weiyang', text: '……我也是。', next: 'wy_good_001', expression: 'smile' },
  { id: 'wy_good_001', type: 'narration', text: '观星会那晚，来了很多人。老天文馆在拆除前，投出了最后一片星空。', next: 'wy_good_002' },
  { id: 'wy_good_002', type: 'dialogue', speaker: 'weiyang', text: '我要搬去很远的地方了。', next: 'wy_good_003', expression: 'gentle' },
  { id: 'wy_good_003', type: 'dialogue', speaker: 'linche', text: '嗯。别把未来说死。', next: 'wy_good_004' },
  { id: 'wy_good_004', type: 'dialogue', speaker: 'weiyang', text: '好。', next: 'ending_weiyang_good_node', expression: 'smile' },

  {
    id: 'ending_weiyang_good_node',
    type: 'ending',
    endingId: 'ending_weiyang_good',
    title: '星轨仍在',
    texts: [
      '分别那天，车站的风比想象中凉。',
      '未央没有回头。我知道她不是狠心，只是怕一回头就走不了了。',
      '我去了父亲希望的那座城市，学物理，偶尔去天文台。',
      '很多年后，我收到一张星空照片。背面写着：',
      '「这次我没有替你记得，我们一起记得。」',
      '—— 结局：星轨仍在 ——',
    ],
  },

  { id: 'wy_bad_path', type: 'dialogue', speaker: 'weiyang', text: '……嗯。', next: 'wy_bad_001', expression: 'sad' },
  { id: 'wy_bad_001', type: 'narration', text: '观星会那晚，未央一个人完成了所有工作。', next: 'wy_bad_002' },
  { id: 'wy_bad_002', type: 'narration', text: '她离开的那天，我没有去车站。', next: 'wy_bad_003' },
  { id: 'wy_bad_003', type: 'narration', text: '天文馆拆除后，我在空地上捡到一张照片。', next: 'ending_weiyang_bad_node' },

  {
    id: 'ending_weiyang_bad_node',
    type: 'ending',
    endingId: 'ending_weiyang_bad',
    title: '错过的光',
    texts: [
      '照片上是某年流星雨下的两个小孩。背面空白，像一句没送出去的话。',
      '凌川的夏天结束了。某些光，一旦错过，就只剩剪影。',
      '—— 结局：错过的光 ——',
    ],
  },

  // ===== ZHIXIA ROUTE =====
  { id: 'route_zhixia_start', type: 'background', bg: 'classroom_sunset', bgm: 'day', next: 'zx_001' },
  { id: 'zx_001', type: 'effect', changes: { route: 'zhixia' }, next: 'zx_002' },
  { id: 'zx_002', type: 'show', character: 'zhixia', expression: 'serious', position: 'center', next: 'zx_003' },
  { id: 'zx_003', type: 'dialogue', speaker: 'zhixia', text: '你来了。Interview 在明天。', next: 'zx_004' },
  { id: 'zx_004', type: 'dialogue', speaker: 'linche', text: '你看起来……不太对。', next: 'zx_005' },
  { id: 'zx_005', type: 'dialogue', speaker: 'zhixia', text: '家里 要我留在本地。Interview 是我唯一的机会。', next: 'zx_006', expression: 'sad' },
  { id: 'zx_006', type: 'narration', text: '她第一次在面前崩溃。试卷散落一地，像被风吹乱的羽毛。', next: 'zx_007' },
  { id: 'zx_007', type: 'dialogue', speaker: 'zhixia', text: '我不是不相信奇迹。我只是不敢把人生交给奇迹。', next: 'zx_choice11' },

  {
    id: 'zx_choice11',
    type: 'choice',
    choices: [
      { text: '「做你自己的选择。我支持你。」', next: 'zx_good_path', changes: { affection: { zhixia: 3 }, attitude: { face: 2 }, flags: { zhixia_supported: true } } },
      { text: '「留在本地也挺好的，稳定。」', next: 'zx_bad_path', changes: { attitude: { escape: 2 } } },
    ],
  },

  { id: 'zx_good_path', type: 'dialogue', speaker: 'zhixia', text: '……谢谢。', next: 'zx_good_001', expression: 'smile' },
  { id: 'zx_good_001', type: 'narration', text: '面试那天，知夏表现出色。她拿到了远方大学的录取。', next: 'zx_good_002' },
  { id: 'zx_good_002', type: 'background', bg: 'station_morning', bgm: 'ending', next: 'zx_good_003' },
  { id: 'zx_good_003', type: 'dialogue', speaker: 'zhixia', text: '你看，选择题最讨厌的地方不是选错，而是不敢选。', next: 'zx_good_004', expression: 'gentle' },
  { id: 'zx_good_004', type: 'dialogue', speaker: 'linche', text: '你选了。', next: 'ending_zhixia_good_node' },

  {
    id: 'ending_zhixia_good_node',
    type: 'ending',
    endingId: 'ending_zhixia_good',
    title: '开往远方的车票',
    texts: [
      '火车启动的时候，知夏在车窗里朝我挥了挥手。',
      '我也终于填了外地大学的志愿。不是逃避，是面对。',
      '有些路，只有走出去才知道方向。',
      '—— 结局：开往远方的车票 ——',
    ],
  },

  { id: 'zx_bad_path', type: 'dialogue', speaker: 'zhixia', text: '……也许吧。', next: 'zx_bad_001', expression: 'neutral' },
  { id: 'zx_bad_001', type: 'narration', text: '知夏放弃了面试。她留在本地，考上了一所普通大学。', next: 'zx_bad_002' },
  { id: 'zx_bad_002', type: 'narration', text: '我们在街上偶遇，礼貌地点头，像两个提前老去的人。', next: 'ending_zhixia_bad_node' },

  {
    id: 'ending_zhixia_bad_node',
    type: 'ending',
    endingId: 'ending_zhixia_bad',
    title: '标准答案',
    texts: [
      '「最近好吗？」',
      '「还行。你呢？」',
      '「也是。」',
      '标准答案。标准人生。标准遗憾。',
      '—— 结局：标准答案 ——',
    ],
  },

  // ===== BAICHUAN ROUTE =====
  { id: 'route_baichuan_start', type: 'background', bg: 'underground_machine', bgm: 'tension', next: 'bc_001' },
  { id: 'bc_001', type: 'effect', changes: { route: 'baichuan' }, next: 'bc_002' },
  { id: 'bc_002', type: 'show', character: 'baichuan', expression: 'neutral', position: 'center', next: 'bc_003' },
  { id: 'bc_003', type: 'dialogue', speaker: 'baichuan', text: '十年前，天文馆事故那天，你拉住过我。', next: 'bc_004', expression: 'gentle' },
  { id: 'bc_004', type: 'dialogue', speaker: 'linche', text: '事故？', next: 'bc_005', expression: 'surprised' },
  { id: 'bc_005', type: 'dialogue', speaker: 'baichuan', text: '我不是幽灵。只是存在被不断修正。很多人第二天会忘记我。', next: 'bc_006' },
  { id: 'bc_006', type: 'dialogue', speaker: 'baichuan', text: '便利店是少数能留下我痕迹的地方。', next: 'bc_007', expression: 'sad' },
  { id: 'bc_007', type: 'narration', text: '地下星象仪发出蓝光。那是记忆残影的源头。', next: 'bc_choice12' },

  {
    id: 'bc_choice12',
    type: 'choice',
    choices: [
      { text: '「我会记住你。我们一起关闭它。」', next: 'bc_good_path', changes: { affection: { baichuan: 3 }, attitude: { face: 2 }, flags: { baichuan_seen: true } } },
      { text: '「这太荒谬了。告诉我怎么解决。」', next: 'bc_bad_path', changes: { attitude: { escape: 2 } } },
    ],
  },

  { id: 'bc_good_path', type: 'dialogue', speaker: 'baichuan', text: '谢谢。', next: 'bc_good_001', expression: 'smile' },
  { id: 'bc_good_001', type: 'narration', text: '我们关闭了残影系统。蓝光熄灭的那一刻，白川音的身影变得透明。', next: 'bc_good_002' },
  { id: 'bc_good_002', type: 'narration', text: '新学期。班里来了一个转学生。', next: 'bc_good_003' },
  { id: 'bc_good_003', type: 'show', character: 'baichuan', expression: 'neutral', position: 'center', next: 'bc_good_004' },
  { id: 'bc_good_004', type: 'dialogue', speaker: 'linche', text: '欢迎来到凌川。', next: 'ending_baichuan_good_node', expression: 'smile' },

  {
    id: 'ending_baichuan_good_node',
    type: 'ending',
    endingId: 'ending_baichuan_good',
    title: '第八天的名字',
    texts: [
      '她茫然地看着我，像第一次见面。',
      '这样就好。这一次，是普通的开始。',
      '第八天的名字，终于可以被正常地叫出来。',
      '—— 结局：第八天的名字 ——',
    ],
  },

  { id: 'bc_bad_path', type: 'dialogue', speaker: 'baichuan', text: '……好吧。', next: 'bc_bad_001', expression: 'sad' },
  { id: 'bc_bad_001', type: 'narration', text: '我按她说的关闭了系统。没有告别，没有名字。', next: 'bc_bad_002' },
  { id: 'bc_bad_002', type: 'background', bg: 'convenience_night', bgm: 'night', next: 'bc_bad_003' },
  { id: 'bc_bad_003', type: 'narration', text: '冰柜最下层，只剩一瓶没有标签的汽水。', next: 'ending_baichuan_bad_node' },

  {
    id: 'ending_baichuan_bad_node',
    type: 'ending',
    endingId: 'ending_baichuan_bad',
    title: '无人认领的汽水',
    texts: [
      '没有人记得白川音。',
      '风铃响的时候，只有我听见空荡的回声。',
      '—— 结局：无人认领的汽水 ——',
    ],
  },

  // ===== TRUE ROUTE =====
  { id: 'route_true_start', type: 'background', bg: 'rooftop_stars', bgm: 'stars', next: 'tr_001' },
  { id: 'tr_001', type: 'effect', changes: { route: 'true' }, next: 'tr_002' },
  { id: 'tr_002', type: 'narration', text: '我不应该只在某一条路线里拯救某一个人。', next: 'tr_003' },
  { id: 'tr_003', type: 'narration', text: '这个夏天属于所有人。我应该面对整个结束。', next: 'tr_004' },
  { id: 'tr_004', type: 'show', character: 'weiyang', expression: 'neutral', position: 'left', next: 'tr_005' },
  { id: 'tr_005', type: 'show', character: 'zhixia', expression: 'neutral', position: 'center', next: 'tr_006' },
  { id: 'tr_006', type: 'show', character: 'baichuan', expression: 'smile', position: 'right', next: 'tr_007' },
  { id: 'tr_007', type: 'dialogue', speaker: 'linche', text: '最后一次观星会。我想邀请所有人。', next: 'tr_008' },
  { id: 'tr_008', type: 'show', character: 'zhouyuan', expression: 'smile', position: 'left', next: 'tr_009' },
  { id: 'tr_009', type: 'dialogue', speaker: 'zhouyuan', text: '行啊。反正以后也没机会在这看星星了。', next: 'tr_010' },
  { id: 'tr_010', type: 'show', character: 'linmu', expression: 'gentle', position: 'right', next: 'tr_011' },
  { id: 'tr_011', type: 'dialogue', speaker: 'linmu', text: '妈把便利店最后一批饭团带来。', next: 'tr_012', expression: 'smile' },
  { id: 'tr_012', type: 'narration', text: '观星会那晚，旧天文馆最后一次亮起。', next: 'tr_013' },
  { id: 'tr_013', type: 'dialogue', speaker: 'weiyang', text: '谢谢你们来。', next: 'tr_014', expression: 'smile' },
  { id: 'tr_014', type: 'dialogue', speaker: 'zhixia', text: '我填了远方大学的志愿。', next: 'tr_015', expression: 'gentle' },
  { id: 'tr_015', type: 'dialogue', speaker: 'baichuan', text: '我会以普通身份留下来。', next: 'tr_016', expression: 'smile' },
  { id: 'tr_016', type: 'dialogue', speaker: 'linche', text: '我也决定离开小城读书了。', next: 'tr_017' },
  { id: 'tr_017', type: 'narration', text: '天文馆被拆。便利店关门。但我们认真告别过。', next: 'tr_018' },
  { id: 'tr_018', type: 'background', bg: 'beach_dusk', bgm: 'ending', next: 'tr_019' },
  { id: 'tr_019', type: 'narration', text: '—— 数年后 ——', next: 'tr_020' },
  { id: 'tr_020', type: 'narration', text: '我回到凌川。旧便利店的位置，变成了一家小书店。', next: 'tr_021' },
  { id: 'tr_021', type: 'narration', text: '门口挂着旧招牌改成的木牌：「星轨便利店」。', next: 'tr_022' },
  { id: 'tr_022', type: 'narration', text: '推门进去，风铃响了。', next: 'tr_023' },
  { id: 'tr_023', type: 'dialogue', speaker: 'baichuan', text: '欢迎回来。', next: 'ending_true_node', expression: 'smile' },

  {
    id: 'ending_true_node',
    type: 'ending',
    endingId: 'ending_true',
    title: '星轨便利店',
    texts: [
      '不是所有东西都能留下。',
      '但认真告别过的东西，会以另一种方式继续存在。',
      '星轨仍在。便利店仍在。只是换了一种形状。',
      '—— 真结局：星轨便利店 ——',
    ],
  },
];

export function getStoryNodeCount(): number {
  return STORY_NODES.length;
}
