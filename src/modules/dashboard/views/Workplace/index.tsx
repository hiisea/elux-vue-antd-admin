/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-useless-escape */
import {DocumentHead, Link} from '@elux/vue-web';
import styles from './index.module.less';

const summaryHtml = (
  <div>
    <div>
      <img src="/client/imgs/logo-icon-rotate.svg" alt="elux" width="200" />
      <h2>
        <a href="https://eluxjs.com">eluxjs.com</a>
      </h2>
      <h3>基于“微模块”和“模型驱动”的跨平台、跨框架『同构方案』</h3>
      <small>支持React/Vue/Web(浏览器)/Micro(微前端)/SSR(服务器渲染)/MP(小程序)/APP(手机应用)</small>
    </div>

    <h2 id="项目介绍">项目介绍</h2>
    <p>
      本项目主要基于<code>Elux+Antd</code>构建，包含<code>React</code>版本和<code>Vue</code>版本，旨在提供给大家一个<strong>简单基础</strong>、
      <strong>开箱即用</strong>
      的后台管理系统通用模版，主要包含运行环境、脚手架、代码风格、基本Layout、状态管理、路由管理、增删改查逻辑、列表、表单等。
    </p>
    <blockquote>
      <p>
        为保持工程简单清爽，方便二次开发，只提供基本版式和通用组件，不集成各种眼花缭乱的组件，需要的时候自己加进去就行了，Antd本身也自带很多组件。
      </p>
    </blockquote>
    <h2 id="在线预览">在线预览</h2>
    <p>
      <Link to="/" action="push" target="page">
        http://admin-react-antd.eluxjs.com/
      </Link>
    </p>
    <h2 id="git仓库">Git仓库</h2>
    <ul>
      <li>
        React版本
        <ul>
          <li>
            github: <a href="https://github.com/hiisea/elux-react-antd-admin">https://github.com/hiisea/elux-react-antd-admin</a>
          </li>
          <li>
            gitee: <a href="https://gitee.com/hiisea/elux-react-antd-admin-fork">https://gitee.com/hiisea/elux-react-antd-admin-fork</a>
          </li>
        </ul>
      </li>
      <li>
        Vue版本
        <ul>
          <li>
            github: <a href="https://github.com/hiisea/elux-vue-antd-admin">https://github.com/hiisea/elux-vue-antd-admin</a>
          </li>
          <li>
            gitee: <a href="https://gitee.com/hiisea/elux-vue-antd-admin-fork">https://gitee.com/hiisea/elux-vue-antd-admin-fork</a>
          </li>
        </ul>
      </li>
    </ul>
    <h2 id="安装方法">安装方法</h2>
    <ul>
      <li>
        使用Git命令clone相应的库：<code>git clone xxx</code>
      </li>
      <li>
        也可以使用Elux提供的命令：<code>npm create elux@latest 或 yarn create elux</code>
      </li>
    </ul>
    <h2 id="⚠️注意事项">⚠️注意事项</h2>
    <p>
      安装请注意！安装请注意！安装请注意！重要的事情说三遍，因为使用了<code>workspace</code>，所以请保证你的安装环境：
    </p>
    <ul>
      <li>Node版本 &gt;= 14.0.0</li>
      <li>
        推荐使用 <code>yarn</code> 安装依赖
      </li>
      <li>
        如果使用 <code>npm</code> 安装依赖，npm版本 &gt;= 7.0
      </li>
      <li>
        本项目代码风格检查以 LF 作为换行符，如果你在windows中使用<code>git clone</code>，最好关闭<code>autocrlf</code>
        <blockquote>
          <p>git config --global core.autocrlf false</p>
        </blockquote>
      </li>
    </ul>
    <h2 id="你看得见的ui">你看得见的UI</h2>
    <ul>
      <li>
        <p>🚀 提供通用的Admin系统Layout（包括注册、登录、忘记密码等）。</p>
      </li>
      <li>
        <p>🚀 动态获取Menu菜单、轮询最新消息等。</p>
      </li>
      <li>
        <p>
          🚀 支持第一次后退溢出，自动回到首页，再次后退则弹出提示：<code>您确定要离开本站？</code>防止用户误操作。{' '}
          <img src="/client/imgs/leave.jpg" alt="elux收藏夹" />
        </p>
      </li>
      <li>
        <p>提供&lt;DocumentHead&gt;组件，方便在SinglePage中维护document title、keyword、description等，该组件也可用于SSR，例如：</p>
        <pre
          v-html={`<code class="language-ts">&lt;DocumentHead title={(id?&#39;修改&#39;:&#39;新增&#39;)+&#39;用户&#39;} /&gt;
</code>`}
        />
      </li>
      <li>
        <p>🚀 提供配置式查询表单, 还带TS类型验证哦，再也不担心写错字段名：</p>
        <pre
          v-html={`<code class="language-ts">const formItems: SearchFromItems&lt;ListSearchFormData&gt; = [
  {name: &#39;name&#39;, label: &#39;用户名&#39;, formItem: &lt;Input placeholder=&quot;请输入关键字&quot; /&gt;},
  {name: &#39;nickname&#39;, label: &#39;呢称&#39;, formItem: &lt;Input placeholder=&quot;请输入呢称&quot; /&gt;},
  {name: &#39;status&#39;, label: &#39;状态&#39;, formItem: &lt;Select placeholder=&quot;请选择用户状态&quot; /&gt;},
  {name: &#39;role&#39;, label: &#39;角色&#39;, formItem: &lt;Select placeholder=&quot;请选择用户状态&quot; /&gt;},
  {name: &#39;email&#39;, label: &#39;Email&#39;, formItem: &lt;Input placeholder=&quot;请输入Email&quot; /&gt;},
];
</code>`}
        />
      </li>
      <li>
        <p>
          🚀 提供展开与隐藏高级搜索：
          <Link to="/admin/member/list/maintain?email=u.mese%40jww.gh" action="push" target="page">
            展开高级
          </Link>
           / 
          <Link to="/admin/member/list/maintain" action="push" target="page">
            隐藏高级
          </Link>
        </p>
      </li>
      <li>
        <p>
          🚀 提供跨页选取、重新搜索后选取、review已选取：
          <Link to="/admin/member/list/maintain" action="push" target="page">
            跨页选取
          </Link>
        </p>
      </li>
      <li>
        <p>
          🚀 提供配置式批量操作等功能，如：
          <Link to="/admin/member/list/maintain" action="push" target="page">
            批量操作
          </Link>
        </p>
        <pre
          v-html={`<code class="language-ts">const batchActions = {
    actions: [
      {key: &#39;delete&#39;, label: &#39;批量删除&#39;, confirm: true},
      {key: &#39;resolved&#39;, label: &#39;批量通过&#39;, confirm: true},
      {key: &#39;rejected&#39;, label: &#39;批量拒绝&#39;, confirm: true},
    ],
    handler: (item: {key: string}, ids: (string | number)[]) =&gt; {
      if (item.key === &#39;delete&#39;) {
        deleteItems(ids as string[]);
      } else if (item.key === &#39;resolved&#39;) {
        alterItems(ids as string[], {status: Status.审核通过});
      } else if (item.key === &#39;rejected&#39;) {
        alterItems(ids as string[], {status: Status.审核拒绝});
      }
    },
  };
</code>`}
        />
      </li>
      <li>
        <p>
          🚀 提供资源选择器，并封装成select，可单选、多选、选满自动提交，如：
          <Link to="/admin/article/item/edit?__c=_dialog" action="push" target="window">
            创建文章时，查询并选择责任编辑
          </Link>
        </p>
        <pre
          v-html={`<code class="language-jsx">&lt;FormItem {...fromDecorators.editors}&gt;
  &lt;MSelect&lt;MemberListSearch&gt;
    placeholder=&quot;请选择责任编辑&quot;
    selectorPathname=&quot;/admin/member/list/selector&quot;
    fixedSearch={{role: Role.责任编辑, status: Status.启用}}
    limit={[1, 2]}
    returnArray
    showSearch
  &gt;&lt;/MSelect&gt;
&lt;/FormItem&gt;
</code>`}
        />
      </li>
      <li>
        <p>
          🚀 提供收藏夹书签功能，用其代替Page选项卡，操作更灵活。点击左上角
          <Link to="/admin/member/list/maintain" action="push" target="page">
            【+收藏】
          </Link>
          试试... <img src="/client/imgs/favs.jpg" alt="elux收藏夹" />
        </p>
      </li>
      <li>
        <p>
          🚀 提供页内刷新功能。点击右上角
          <Link to="/admin/member/list/maintain" action="push" target="page">
            【刷新按钮】
          </Link>
          试试...
        </p>
      </li>
      <li>
        <p>🚀 虚拟Window</p>
        <ul>
          <li>
            路由跳转时可以在新的虚拟窗口中打开，类似于target=&#39;_blank&#39;，但是虚拟Window哦，如：
            <Link to="/admin/article/list/index?author=48&amp;__c=_dialog" action="push" target="window">
              新窗口打开
            </Link>
             / 
            <Link to="/admin/article/list/index?author=48" action="push" target="page">
              本窗口打开
            </Link>
          </li>
          <li>窗口中可以再开新窗口，最多可达10级</li>
          <li>弹窗再弹弹窗体验不好？多层弹窗时自动隐藏下层弹窗，关闭上层弹窗自动恢复下层弹窗，保证每一时刻始终之会出现一层弹窗</li>
          <li>
            实现真正意义上的Window（非简单的Dialog），每个窗口不仅拥有独立的Dom、状态管理Store、还自动维护独立的<code>历史记录栈</code>
          </li>
          <li>
            提供窗口工具条：后退、刷新、关闭，如：
            <Link to="/admin/article/list/index?author=48&amp;__c=_dialog" action="push" target="window">
              文章列表
            </Link>{' '}
            =&gt; 点击标题 =&gt; 点击作者 =&gt; 点击文章数。然后你可以依次回退每一步操作，也可一次性全部关闭。
          </li>
          <li>
            提供窗口最大化、最小化按钮，如：
            <Link to="/admin/article/item/detail/50?__c=_dialog" action="push" target="window">
              文章详情，窗口左上角按钮
            </Link>
            ；并支持默认最大化，如：
            <Link to="/admin/article/item/edit?__c=_dialog" action="push" target="window">
              创建文章
            </Link>{' '}
            <img src="/client/imgs/window.jpg" alt="elux虚拟窗口" />
          </li>
          <li>
            窗口可以通过Url发送，如将<code>http://admin-react-antd.eluxjs.com/admin/member/item/edit/50?__c=_dialog</code>
            发送给好友后，其可以通过Url还原窗口。
          </li>
          <li>
            实现<code>keep-alive</code>
            。keep-alive优点是用户体验好，缺点是太占资源（需要缓存所有Dom元素还有相关内存变量），现在使用虚拟Windw，你想keep-alive就在新窗口中打开，不想keep-alive就在原窗口中打开，关闭窗口就自动销毁keep-alive
          </li>
        </ul>
      </li>
      <li>
        <p>🚀 基于抽象的增删改查逻辑：</p>
        <ul>
          <li>
            业务逻辑通过类的继承复用，如果是标准的增删改查基本上<code>不用写代码</code>，否则可以自己覆盖父类中的某些方法：
          </li>
        </ul>
        <pre
          v-html={`<code class="language-ts">export class Model extends BaseResource&lt;MemberResource&gt; {
  protected api = api;
  protected defaultListSearch = defaultListSearch;
}
</code>`}
        />
        <ul>
          <li>
            UI逻辑通过<code>Hooks</code>复用。
          </li>
          <li>
            将视图抽象成为2大类：<em>列表</em>(List)和<em>单条</em>(Item)，抽取其共性。
          </li>
          <li>
            在此基础上引入视图<code>渲染器(Render)</code>概念，类别名+渲染器=具体某个业务视图，如：
            <ul>
              <li>
                type=list,render=maintain(列表+维护)，如：
                <Link to="/admin/member/list/maintain" action="push" target="page">
                  /admin/member/list/maintain
                </Link>
              </li>
              <li>
                type=list,render=index(列表+展示)，如：
                <Link to="/admin/article/list/index?author=49&amp;__c=_dialog" action="push" target="window">
                  /admin/article/list/index
                </Link>
              </li>
              <li>
                type=list,render=selector(列表+选择)，如：
                <Link to="/admin/member/list/selector?role=editor&amp;status=enable&amp;__c=_dialog" action="push" target="window">
                  /admin/member/list/selector
                </Link>
              </li>
              <li>
                type=item,render=detail(单条+展示)，如：
                <Link to="/admin/member/item/detail/49?__c=_dialog" action="push" target="window">
                  /admin/member/item/detail/49
                </Link>
              </li>
              <li>
                type=item,render=edit(单条+编辑)，如：
                <Link to="/admin/member/item/edit/49?__c=_dialog" action="push" target="window">
                  /admin/member/item/edit/49
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
    <h2 id="你看不见的幕后">你看不见的幕后</h2>
    <ul>
      <li>
        <p>🚀 使用微模块架构，将业务功能封装成独立微模块，想要哪个功能就安装哪个模块，是一种粒度更细的微前端</p>
        <pre
          v-html={`<code class="language-txt"> 你以前的SRC长这样？？？
  │
  ├─ src
  │  ├─ api                 # API接口管理
  │  ├─ assets              # 静态资源文件
  │  ├─ components          # 全局组件
  │  ├─ config              # 全局配置项
  │  ├─ directives          # 全局指令文件
  │  ├─ enums               # 项目枚举
  │  ├─ hooks               # 常用 Hooks
  │  ├─ language            # 语言国际化
  │  ├─ layout              # 框架布局
  │  ├─ routers             # 路由管理
  │  ├─ store               # store
  │  ├─ styles              # 全局样式
  │  ├─ typings             # 全局 ts 声明
  │  ├─ utils               # 工具库
  │  ├─ views               # 项目所有页面
  │  ├─ App.vue             # 入口页面
  │  └─ main.ts             # 入口文件
</code>`}
        />
        <p> 快来拯救你的SRC🔥，</p>
        <pre
          v-html={`<code class="language-txt">使用微模块后SRC长这样！！！
  │
  ├─ src
  │  ├─ moddules            # 各业务微模块
  │  │    ├─ user
  │  │    ├─ article
  │  │    ├─ comment
  │  ├─ Project.vue         # 各微模块聚合配置
  │  └─ index.ts            # 入口文件
</code>`}
        />
        <ul>
          <li>微模块支持同步/异步加载</li>
          <li>微模块支持本地目录、支持发布成NPM包，支持独立部署（微前端）</li>
          <li>微模块支持整体TS类型验证与提示</li>
        </ul>
      </li>
      <li>
        <p>🚀 内置最强状态管理框架(^-^)：</p>
        <ul>
          <li>
            同时支持<code>React/Vue</code>的状态管理框架。
          </li>
          <li>最大程度简化action和store的写法：</li>
        </ul>
        <pre
          v-html={`<code class="language-ts">export class Model extends BaseMode {

  @reducer //类似Vuex的mutations
  public putCurUser(curUser: CurUser) {
    this.state.curUser = curUser; // vue中可直接修改
    //this.state = {...this.state, curUser} react中
  }

  @effect() //类似Vuex的action
  public async login(args: LoginParams) {
    const curUser = await api.login(args);
    this.dispatch(this.actions.putCurUser(curUser));
    this.getRouter().relaunch({url: AdminHomeUrl}, &#39;window&#39;);
  }
}
</code>`}
        />
        <ul>
          <li>与路由结合，支持Store多实例。</li>
          <li>路由跳转时自动清理Store，再也不用担心State无限累积。</li>
          <li>为action引入线程机制，支持在处理action的过程中，在派生出新的action线程。</li>
          <li>action执行中支持异步操作：</li>
        </ul>
        <pre
          v-html={`<code class="language-ts">@effect()
public async updateItem(id: string, data: UpdateItem) {
  await this.api.updateItem!({id, data}); //调用后台API
  await this.getRouter().back(1, &#39;window&#39;); //路由后退一步(到列表页)
  message.success(&#39;编辑成功！&#39;); //提示
  this.getRouter().back(0); //back(0)表示刷新当前页(列表页)
}
</code>`}
        />
        <ul>
          <li>
            支持<code>awiat dispatch(action)</code>执行，如在UI中等待login这个action的执行结果：
          </li>
        </ul>
        <pre
          v-html={`<code class="language-ts">const onSubmit = (values: HFormData) =&gt; {
  const result = dispatch(stageActions.login(values));
  //stageActions.login()中包含异步请求，返回Promise

  result.catch(({message}) =&gt; {
    //如果出错(密码错误)，在form中展示出错信息
    form.setFields([{name: &#39;password&#39;, errors: [message]}]);
  });
};
</code>`}
        />
        <ul>
          <li>
            为action引入事件机制，dispatch一个action支持多处监听，共同协作完成一个长流程业务。例如：ModelA 和 ModelB 都想监听<code>用户切换</code>
            这个Action：
          </li>
        </ul>
        <pre
          v-html={`<code class="language-ts">// ModelA:
export class ModelA extends BaseResource {
  @effect()
  public async [&#39;stage.putCurUser&#39;](user: User) {
    if (user.hasLogin) {
        this.dispath(this.actions.xxx());
    } else {
        this.dispath(this.actions.xxx());
    }
  }
}

// ModelB:
export class ModelB extends BaseResource{
  @effect()
  public async [&#39;stage.putCurUser&#39;](user: User) {
    if (user.hasLogin) {
        this.dispath(this.actions.xxx());
    } else {
        this.dispath(this.actions.xxx());
    }
  }
}
</code>`}
        />
        <ul>
          <li>
            路由跳转前会自动派发<code>stage._testRouteChange</code>的action，你可以监听它，阻止路由跳转：
          </li>
        </ul>
        <pre
          v-html={`<code class="language-ts">@effect(null)
protected async [&#39;this._testRouteChange&#39;]({url, pathname}) {
    if (!this.state.curUser.hasLogin &amp;&amp; this.checkNeedsLogin(pathname)) {
        throw new CustomError(CommonErrorCode.unauthorized, &#39;请登录！&#39;);
    }
}
</code>`}
        />
        <ul>
          <li>支持catch action执行过程中的错误，并决定继续或终止当前action执行：</li>
        </ul>
        <pre
          v-html={`<code class="language-ts">@effect(null)
protected async [&#39;this._error&#39;](error: CustomError) {
    if (error.code === CommonErrorCode.unauthorized) {
        this.getRouter().push({url: &#39;/login&#39;}, &#39;window&#39;);
    }else{
        alert(error.message);
    }
    throw error;
}
</code>`}
        />
        <ul>
          <li>
            <p>最方便的注入loading状态，想要跟踪异步action的执行情况？只需要在声明方法中传人key名就行了，如：</p>
            <pre
              v-html={`<code class="language-ts">@effect(&#39;this.listLoading&#39;) //将该异步action的执行状态注入this.state.listLoading中
public async fetchList(listSearchData?: TDefineResource[&#39;ListSearch&#39;]) {
  const listSearch = listSearchData || this.state.listSearch || this.defaultListSearch;
  const {list, listSummary} = await this.api.getList!(listSearch);
  this.dispatch(this.privateActions.putList(listSearch, list, listSummary));
}
</code>`}
            />
          </li>
          <li>
            <p>
              武装到牙齿的Typescript智能提示和自动补全（并且类型自动生成，无需手写）：
              <img src="/client/imgs/type.jpg" alt="elux-ts" />
            </p>
          </li>
        </ul>
      </li>
      <li>
        <p>🚀 提供基于双栈单链的虚拟路由。</p>
        <ul>
          <li>拥有2维历史记录栈，相当于在SinglePage中虚拟了一个完整的浏览器，页面可以在原窗口中打开，也可以新开一个虚拟窗口打开。</li>
        </ul>
        <pre
          v-html={`<code class="language-ts">router.push({url: &#39;/login&#39;}, &#39;page&#39;) //在原窗口中打开
router.push({url: &#39;/login&#39;}, &#39;window&#39;) //在新窗口中打开
</code>`}
        />
        <ul>
          <li>基于虚拟路由，不再直接关联原生路由，中间可以转换映射。</li>
          <li>跨平台，可用于浏览器、服务器SSR、小程序、原生应用。</li>
          <li>跨框架，可用于React、Vue。</li>
          <li>不依赖其它路由框架，如react-router、vue-router。</li>
          <li>可完整保存历史快照，包括Store和Dom元素。</li>
          <li>可访问和查找历史记录，不再只是一个history.length：</li>
        </ul>
        <pre
          v-html={`<code class="language-ts">const length = router.getHistoryLength(); //获取历史栈中的记录数
const list = router.getHistory(); //获取所有历史记录
const record = router.findRecordByStep(10); //获取10步之前的历史记录
const record2 = router.findRecordByKey(&#39;8_1&#39;); //获取编号为8_1的历史记录
</code>`}
        />
        <p>
          {' '}
          例如登录窗口中点击“取消登录”你需要回退到前一个页面，但此时如果前一个页面就是需要登录的页面，那么登录窗口又会被重新弹出。所以点击“取消登录”应当回退到最近的不需要登录的页面：
        </p>
        <pre
          v-html={`<code class="language-ts">@effect()
public async cancelLogin(): Promise&lt;void&gt; {
  //在历史栈中找到第一条不需要登录的记录
  //如果简单的back(1)，前一个页面需要登录时会引起循环
  this.getRouter().back((record) =&gt; {
    return !this.checkNeedsLogin(record.location.pathname);
  }, &#39;window&#39;);
}
</code>`}
        />
        <ul>
          <li>支持路由拦截和路由守卫：</li>
        </ul>
        <pre
          v-html={`<code class="language-ts">@effect(null)
protected async [&#39;this._testRouteChange&#39;]({url, pathname}) {
    if (!this.state.curUser.hasLogin &amp;&amp; this.checkNeedsLogin(pathname)) {
        throw new CustomError(CommonErrorCode.unauthorized, &#39;请登录！&#39;);
    }
}
</code>`}
        />
        <ul>
          <li>支持后退溢出时重定向，比如防止用户后退过多，不小心退出了本站：</li>
        </ul>
        <pre
          v-html={`<code class="language-ts">@effect(null)
protected async [&#39;this._error&#39;](error: CustomError): Promise&lt;void&gt; {
  if (error.code === ErrorCodes.ROUTE_BACK_OVERFLOW) {//后退溢出时会抛出
    const redirect: string = HomeUrl;
    //如果已经时主页，则提示用户是否退出本站？
    if (this.getRouter().location.url === redirect &amp;&amp; window.confirm(&#39;确定要退出本站吗？&#39;)){
      //注意: back(&#39;&#39;)可以退出本站
      setTimeout(() =&gt; this.getRouter().back(&#39;&#39;, &#39;window&#39;), 0);
    } else {
      //如果不是在主页，则先回到主页
      setTimeout(() =&gt; this.getRouter().relaunch({url: redirect}, &#39;window&#39;), 0);
    }
  };
}
</code>`}
        />
        <ul>
          <li>可跟踪和等待路由跳转完成。例如修改用户后，需要返回列表页面并刷新：</li>
        </ul>
        <pre
          v-html={`<code class="language-ts">@effect()
public async updateItem(id: string, data: UpdateItem) {
  await this.api.updateItem!({id, data});
  await this.getRouter().back(1, &#39;window&#39;); //可await路由后退
  message.success(&#39;编辑成功！&#39;);
  this.getRouter().back(0); //back(0)可刷新页面
}
</code>`}
        />
        <ul>
          <li>提供更多路由跳转方法</li>
        </ul>
        <pre
          v-html={`<code class="language-ts">router.push(location, target); //新增
router.replace(location, target); //替换
router.relaunch(location, target); //重置
router.back(stepOrCallback, target) //后退或刷新
</code>`}
        />
      </li>
      <li>
        <p>
          🚀 提供与项目同构的本地MockServer，MockServer也使用Typescript，但无需再写类型文件，直接从<code>src/</code>下面与项目共享，支持修改自动重启。
        </p>
      </li>
      <li>
        <p>
          🚀 开箱即用的脚手架。提供封装好的<code>Cli命令行</code>脚手架，不用自己折腾：
          <img src="/client/imgs/cli.jpg" alt="elux脚手架" />
        </p>
      </li>
      <li>
        <p>
          🚀 基本的<code>eslint/stylelint/babel</code>都已经帮你打包好了，不用安装各种插件和写一大堆依赖：
        </p>
        <pre
          v-html={`<code class="language-json">&quot;devDependencies&quot;: {
  &quot;@elux/babel-preset&quot;: &quot;^1.0.2&quot;,
  &quot;@elux/eslint-plugin&quot;: &quot;^1.2.2&quot;,
  &quot;@elux/stylelint-config&quot;: &quot;^1.1.1&quot;
}
</code>`}
        />
      </li>
      <li>
        <p>🚀 未完待续...</p>
      </li>
    </ul>
    <h2 id="不使用npm管理微模块">不使用NPM管理微模块</h2>
    <p>
      项目中的<code>微模块</code>默认是使用NPM包来管理的，每个微模块下都有一个<code>package.json</code>文件，例如：
      <code>src/modules/admin/package.json</code>，开发时使用了<code>workspace</code>和<code>monorepo</code>来管理：
    </p>
    <pre
      v-html={`<code class="language-json">  &quot;workspaces&quot;: [
    &quot;./mock&quot;,
    &quot;./public&quot;,
    &quot;./src/modules/*&quot;
  ],
</code>`}
    />
    <p>
      跨<code>微模块</code>引用时，用的是npm包名，例如：
    </p>
    <pre
      v-html={`<code class="language-ts">import {ListSearch} from &#39;@elux-admin-antd/member/entity&#39;;
</code>`}
    />
    <p>
      <code>微模块</code>最大的好处还是在于<strong>高内聚，低耦合</strong>
      ，至于是否要用npm来管理，不是必须的。如果你不想绕这么一个圈，也可以分分钟改成普通的单体结构：
    </p>
    <pre
      v-html={`<code class="language-ts">import {ListSearch} from &#39;@/modules/member/entity&#39;;
</code>`}
    />
    <p>
      只需要在<code>src/tsconfig.json</code>中加入paths别名就可以了：
    </p>
    <pre
      v-html={`<code class="language-json">&quot;paths&quot;: {
  &quot;@/*&quot;: [&quot;./*&quot;]
}
</code>`}
    />
    <h2 id="vue版特别说明">Vue版特别说明</h2>
    <p>
      Vue版/React版保持同步，由于<a href="https://eluxjs.com">Elux</a>践行“<strong>模型驱动</strong>
      ”的架构理念，View被刻意写得很薄，很多逻辑写在了Model中（因为Model与UI框架无关、Vue和React都可以复用）。
    </p>
    <p>
      所以需要重构的只是View，由于Vue3中可以使用<code>steup+tsx</code>，并且<code>antd-vue</code>与<code>antd-react</code>
      风格和api基本保持一致，所以能2个版本的差异就更小了。Vue版全程使用tsx编写，你也可以自己改成template方式，脚手架已经内置了对.vue文件的支持。也欢迎有空的小伙伴贡献源码，将其重构为
      <code>template</code>版。
    </p>
    <h2 id="更多相关文章">更多相关文章</h2>
    <ul>
      <li>
        <a href="https://juejin.cn/post/7106791733509226533">从&quot;微前端&quot;到“微模块”</a>
      </li>
      <li>
        <a href="https://juejin.cn/post/7124177821953425422">不想当Window的Dialog不是一个好Modal，弹窗翻身记...</a>
      </li>
      <li>
        <a href="https://juejin.cn/post/7124959667326812196">手撸Router，还要啥Router框架？让react-router/vue-router躺一边凉快去</a>
      </li>
      <li>
        <a href="https://juejin.cn/post/7129316859182710814">一种比css_scoped和css_module更优雅的避免css命名冲突小妙招</a>
      </li>
    </ul>
    <h2 id="感谢关注，欢迎参与">感谢关注，欢迎参与</h2>
    <p>
      {' '}
      <a href="https://eluxjs.com">eluxjs.com</a> | <a href="https://juejin.cn/column/7106899933537501221">掘金专栏</a> | QQ/微信交流群
    </p>
    <p>
      <img src="https://eluxjs.com/images/qq.jpg" alt="QQ群" />
      <img src="https://eluxjs.com/images/wechat.jpg" alt="微信群" />
    </p>
    <p>
      开源项目，欢迎参与贡献源码(^V^)！觉得好用别忘了<a href="https://github.com/hiisea/elux-react-antd-admin">Github</a>给个Star哦(-_-)...
    </p>
  </div>
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Component = () => {
  return (
    <div class={styles.root}>
      <DocumentHead title="我的工作台" />
      {summaryHtml}
    </div>
  );
};

export default Component;
