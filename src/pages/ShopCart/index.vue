<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfo in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked === 1"
              @change="updateChecked(cartInfo, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              class="mins"
              @click="handler('minus', -1, cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cartInfo)"
            />
            <a
              class="plus"
              @click="handler('add', 1, cartInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.cartPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteGood(cartInfo.skuId)"
              >删除</a
            >
            <br />
            <a href="javascript:;">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0" @click="updateCartAllChecked"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAllChecked">删除选中的商品</a>
        <a href="javascript:;">移到我的关注</a>
        <a href="javascript:;">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>{{checkedNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a href="javascript:;" class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 按需引入lodash函数
import throttle from "lodash/throttle";
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    // 获取产品数据的回调
    getData() {
      this.$store.dispatch("getShopCart");
    },
    // +或-或修改产品数量的回调 （加上了节流效果）
    handler: throttle(async function (type, number, cartInfo) {
      // type参数区分点击的是+还是-或者input框
      // number参数代表变化量1和-1，以及最终量$event.target.value（不是变化量）
      // cartInfo参数代表购物车信息对象
      switch (type) {
        case "add":
          number = 1;
          break;
        case "minus":
          // 判断购物车信息中的商品数量是否大于1
          number = cartInfo.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // 用户输入不合法或者数值小于1
          if (isNaN(number) || number < 1) {
            number = 0;
          } else {
            // 用户输入合法数字或者小数
            number = parseInt(number) - cartInfo.skuNum;
          }
          break;
      }
      // 派发action
      try {
        await this.$store.dispatch("getUpdateShopCart", {
          skuid: cartInfo.skuId,
          skuNum: number,
        });
        // 再次获取最新数据进行展示
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 1000),
    // 删除某一个产品的回调
    async deleteGood(skuId) {
      try {
        // 如果删除成功
        if (confirm("确定删除此商品么？")) {
          await this.$store.dispatch("deleteCartById", skuId);
          // 再次获取数据展示
          this.getData();
        }
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改某一个产品的勾选状态的回调
    async updateChecked(cartInfo, event) {
      try {
        let isChecked = event.target.checked ? 1 : 0;
        // 派发一个action
        await this.$store.dispatch("updateCheckedById", {
          skuId: cartInfo.skuId,
          isChecked,
        });
        // 如果修改成功，再次获取数据展示
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除所有选中商品的回调
    async deleteAllChecked(){
      try {
        if(confirm('确定删除么？')) {
          await this.$store.dispatch('deleteAllCheckedById')
          // 再次发送请求获取购物车列表
          this.getData()
        }
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改全选按钮的回调
    async updateCartAllChecked(event){
      try {
        let isChecked = event.target.checked ? 1 : 0
        // 派发action
        await this.$store.dispatch('updateCartAllChecked',isChecked)
        // 修改成功，再次发送请求
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    ...mapGetters(["cartList"]),
    // 购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 计算购买商品的总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    // 判断底部复选框是否勾选（当全部复选框都选中时才勾选）
    isAllChecked() {
      // every方法，遍历数组，只要数组对象里的isChecked属性有一个不为1则返回false，全等于1则返回true
      return this.cartInfoList.every((item) => item.isChecked === 1);
    },
    // 每行商品信息中选中的个数
    checkedNum(){
      // 数组的reduce方法，用于计数
      let result = this.cartInfoList.reduce((total,currentValue)=>{
        return total += (currentValue.isChecked == 1 ? 1 : 0)
      },0)
      return result
    }
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>