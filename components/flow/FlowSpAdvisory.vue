<template>
  <div :class="$style.container">
    <h4 id="consult" :class="[$style.heading, $style.fzXLarge]">
      {{ $t('新型コロナ受診相談窓口（日本語のみ）') }}
    </h4>
    <dl>
      <div :class="$style.daytime">
        <dt :class="[$style.title, $style.fzMedium]">
          {{ $t('鳥取県東部地区') }}
        </dt>
        <dd :class="$style.link">
          <span>
            {{ $t('平日8:30～17:15') }}
            <br />
            📞
            <a href="tel:0857225625">0857-22-5625</a>
            <br />
            {{ $t('上記の時間以外') }}
            <br />
            📞
            <a href="tel:0857228111">0857-22-8111</a>
          </span>
        </dd>
      </div>
      <div :class="$style.daytime">
        <dt :class="[$style.title, $style.fzMedium]">
          {{ $t('鳥取県中部地区') }}
        </dt>
        <dd :class="$style.link">
          <span>
            📞
            <a href="tel:0858233135">0858-23-3135</a>
            <br />
            📞
            <a href="tel:0858233136">0858-23-3136</a>
          </span>
        </dd>
      </div>
      <div :class="$style.daytime">
        <dt :class="[$style.title, $style.fzMedium]">
          {{ $t('鳥取県西部地区') }}
        </dt>
        <dd :class="$style.link">
          <span>
            📞
            <a href="tel:0859310029">0859-31-0029</a>
            <br />
            📞
            <a href="tel:0859319317">0859-31-9317</a>
          </span>
        </dd>
      </div>
    </dl>
  </div>
</template>

<style module lang="scss">
@import '@/components/flow/flow_sp.scss';

// advisory
.open {
  margin-top: px2vw(20);
  display: flex;
  justify-content: center;

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $white;
    color: $green-1;
    padding: px2vw(20) px2vw(40);
    border-radius: px2vw(6);
  }
}

.daytime {
  margin-top: px2vw(20);
  display: flex;
  border-top: 1px solid $gray-4;

  > * {
    padding: px2vw(30) px2vw(10) 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    text-align: center;
    flex-basis: 40%;
  }

  .link {
    flex-basis: 60%;

    > a {
      text-decoration: none;
    }
  }
}

.night {
  margin: px2vw(30) auto;
  padding-left: 0 !important;
  text-align: center;

  > li {
    list-style-type: none;

    &:not(:first-child) {
      margin-top: px2vw(20);
    }
  }
}

@include largerThan($small) {
  $vw: 960;

  .open {
    margin-top: px2vw(20, $vw);

    > span {
      padding: px2vw(20) px2vw(40, $vw);
      border-radius: px2vw(6, $vw);
    }
  }

  .daytime {
    margin-top: px2vw(20, $vw);

    > * {
      padding: px2vw(30) px2vw(10, $vw);
    }
  }

  .night {
    margin: px2vw(30, $vw) auto;

    > li {
      &:not(:first-child) {
        margin-top: px2vw(20, $vw);
      }
    }
  }
}
</style>
