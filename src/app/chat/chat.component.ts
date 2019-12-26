import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as wangEditor from '../../../node_modules/wangeditor/release/wangEditor.js';
import { WebSocketService } from '../web-socket.service';
import { ForumHttpService } from '../forum-http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatname;
  public sign = 'wang_editor';

  private editor: any;

  // 展示api获取到的数据
  public showMessage = 'Waiting for display';

  // 默认显示
  public defaultMessage;

  // 设置展示内容输入框变量
  public textareaValue = '<p><span style="font-weight: bold;"> test:</span> 用<span style="color: ' +
    'rgb(139, 170, 74);"> JS 设置的</span>内容&nbsp; &nbsp; &nbsp; &nbsp;<img src="http://img.t.sinajs' +
    '.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png"></p>';

  constructor(
    private routerinfo: ActivatedRoute,
    private websocket: WebSocketService,
    private msg: NzMessageService,
    private forumService: ForumHttpService,
    private el: ElementRef,
    // tslint:disable-next-line: deprecation
    private renderer: Renderer) {
  }
  editorTitle;
  editorContent;
  editorDescription;
  ngOnInit() {
    this.editor = new wangEditor('#editorMenu', '#editor');
    console.log(this.editor);
    // 设置编辑器配置
    this.setEditorConfig();
    // 创建编辑器
    this.editor.create();
    this.connectMsg();
    this.chatname = this.routerinfo.snapshot.queryParams.name;
  }

  // 编辑器相关配置设置
  setEditorConfig() {
    // 菜单展示项配置
    this.editor.customConfig.menus = this.getMenuConfig();
    // 自定义配置颜色（字体颜色、背景色）
    this.editor.customConfig.colors = this.getColorConfig();
    // 表情面板可以有多个 tab ，因此要配置成一个数组。数组每个元素代表一个 tab 的配置
    this.editor.customConfig.emotions = this.getEmotionsConfig();
    // 自定义字体
    this.editor.customConfig.fontNames = this.getFontFamilyConfig();
    // 编辑区域的z-index默认为10000
    // this.editor.customConfig.zIndex = 100;
    // 配置编辑器内容改变触发方法
    this.editor.customConfig.onchange = this.editorContentChange;
    // 编辑器获取到焦点触发方法
    this.editor.customConfig.onfocus = this.editorOnFocus;
    // 编辑器失去焦点触发方法
    this.editor.customConfig.onblur = this.editorOnBlur;
    // 配置服务器端地址
    this.editor.customConfig.uploadImgServer = 'api/upload';
    this.editor.customConfig.uploadFileName = 'file';
    this.editor.customConfig.uploadImgHooks = {
      customInsert(insertImg, result, editor) {
        const url = result.url;
        insertImg(url);
      }
    };
  }

  // 获取显示菜单项
  getMenuConfig(): string[] {
    return [
      'fontName',  // 字体
      'fontSize',  // 字号
      'link',  // 插入链接
      'emoticon',  // 表情
      'image',  // 插入图片
    ];
  }

  // 获取字体、背景颜色列表配置
  getColorConfig(): string[] {
    return [
      '#000000',
      '#eeece0',
      '#1c487f',
      '#4d80bf',
      '#c24f4a',
      '#8baa4a',
      '#7b5ba1',
      '#46acc8',
      '#f9963b',
      '#ffffff'
    ];
  }

  // 获取表情配置
  getEmotionsConfig() {
    return [
      {
        // tab 的标题
        title: '默认',
        // type -> 'emoji' / 'image'
        type: 'image',
        // content -> 数组
        content: [
          {
            alt: '[坏笑]',
            src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png'
          },
          {
            alt: '[舔屏]',
            src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png'
          }
        ]
      },
      {
        // tab 的标题
        title: 'emoji',
        // type -> 'emoji' / 'image'
        type: 'emoji',
        // content -> 数组
        content: ['😀', '😃', '😄', '😁', '😆']
      }
    ];
  }

  // 获取字体列表配置
  getFontFamilyConfig(): string[] {
    return [
      '宋体',
      '微软雅黑',
      'Arial',
      'Tahoma',
      'Verdana'
    ];
  }

  // 富文本编辑器内容变化触发方法
  editorContentChange = (html) => {
    console.log(html);
  }

  // 编辑器获取到焦点触发事件
  editorOnFocus = () => {
    console.log('on focus');
  }

  // 编辑器失去焦点触发事件
  editorOnBlur = (html) => {
    console.log('on blur');
    console.log(html);
  }

  // 设置编辑器显示内容
  setContent() {
    this.editor.txt.html(this.textareaValue);
  }

  // 获取编辑器内容，带html
  async getContent() {
    this.editorContent = this.editor.txt.html();
  }

  // 获取编辑器文字内容
  getContentText() {
    this.showMessage = this.editor.txt.text();
  }
  connectMsg() {
    this.websocket.connectSocket('http://localhost:3000');
  }
  sendMessage = (html) => {
    this.getContent();
    this.websocket.sendMessage(this.editorContent);
    console.log(this.editorContent);
  }
}
