<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveAllGoods" @mouseenter="enterAllGoods">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动分类导航 -->
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <!-- 声明式导航 -->
                  <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                  <!-- 编程式导航 -->
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级分类导航 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <!-- 声明式导航 -->
                        <!-- <router-link to="/search">{{ c2.categoryName }}</router-link> -->
                        <!-- 编程式导航 -->
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <!-- 声明式导航 -->
                          <!-- <router-link to="/search">{{ c3.categoryName }}</router-link> -->
                          <!-- 编程式导航 -->
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入lodash全部函数
// import _ from 'lodash';
// 按需引入lodash函数
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      // 用于存储用户移入的一级图标的index值
      currentIndex: -1,
      // 用于存储TypeNav组件是否展示的布尔值数据
      show: true,
    };
  },
  methods: {
    // 鼠标进入修改一级图标的index
    // 注意：throttle函数不要用箭头函数，可能会出现this指向问题
    changeIndex: throttle(function (index) {
      // 正常情况（用户慢慢操作）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
      // 非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标事件，但是实际只有部分h3触发事件
      // 就是由于用户行为过快，导致浏览器反应不过来，如果当回调函数中有大量业务，有可能出现卡顿现象
      this.currentIndex = index;
    }, 50),
    // 鼠标移出全部商品分类图标修改一级图标的index
    leaveAllGoods() {
      // 修改index
      this.currentIndex = -1;
      // 如果不是home路由组件，隐藏TapeNav菜单
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
    // 进行路由跳转的方法
    goSearch(event) {
      // 最好的解决方案：编程式导航+事件委派
      // 利用事件委派会有一些问题：1.点击的可能不是a标签也跳转了 2.参数怎么传递
      // console.dir(event.target.dataset)
      let { categoryname, category1id, category2id, category3id } =
        event.target.dataset;
      if (categoryname) {
        // 整理路由跳转携带的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 判断是否有params参数，如果有则要一起带上整理完params参数
        if(this.$route.params){
          location.params = this.$route.params
        }
        // 整理完query参数
        location.query = query;
        // 路由跳转
        this.$router.push(location);
      }
    },
    // 鼠标移入全部商品分类图标显示TapeNav菜单
    enterAllGoods() {
      // 显示TapeNav菜单
      this.show = true;
    },
  },
  mounted() {
    // 通知Vuex发请求，获取数据，存储于仓库中
    // this.$store.dispatch("categoryList");
    // 如果不是home路由组件，则TypeNav组件隐藏
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      // 对象写法右侧需要一个函数，当使用这个计算属性的时候，右侧函数会立即执行
      // 注入一个参数state，这参数为总仓库中的state。
      categoryList: (state) => {
        let arr = state.home.categoryList;
        arr.splice(16, 3);
        return arr;
      },
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /* &:hover {
            .item-list {
              display: block;
            }
          } */
        }
        .cur {
          background-color: skyblue;
        }
      }
    }

    .sort-enter{
      height: 0px;
      // transform: rotate(0deg);
    }
    .sort-enter-to{
      height: 461px;
      // transform: rotate(360deg);
    }
    .sort-enter-active{
      transition: all 0.5s linear;
    }
  }
}
</style>