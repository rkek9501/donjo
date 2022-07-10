import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, Dimensions, View, Text } from 'react-native';
import times from 'lodash.times';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const GAUGE_WIDTH = Math.floor(Dimensions.get('window').width);
const INTERVAL_WIDTH = 18;

const calcScale = (v, inputMin, inputMax, outputMin, outputMax, unitSize) => {
  // eslint-disable-next-line prettier/prettier
  return Math.round(((v - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin) * unitSize;
};

const LineGauge = props => {
  let { min, max, unitSize = 10 } = props;
  const scrollRef = useRef(null);
  const scrollMin = 0;
  const scrollMax = (props.max - props.min) * INTERVAL_WIDTH;

  const _scaleValue = v => {
    return calcScale(v, min, max, scrollMin, scrollMax, props.unitSize);
  };

  const [scrollQueue, setScrollQueue] = useState(null);
  const [value, setValue] = useState(props.value || props.min);
  const initialContentOffset = _scaleValue(props.value || props.min);
  const [contentOffset] = useState(initialContentOffset);

  // useEffect(() => {
  //   setScrollQueue({
  //     x: _scaleValue(value, nextProps),
  //     animate: true,
  //   });

  //   if (!_contentSizeWillChange(nextProps)) {
  //     _resolveScrollQueue();
  //   }
  // }, [value]);

  // const _contentSizeWillChange = nextProps => {
  //   let { min, max } = nextProps;
  //   if (min !== props.min || max !== props.max) {
  //     return true;
  //   }

  //   return false;
  // };

  const _scaleScroll = x => {
    let { min, max } = props;
    return calcScale(x, scrollMin, scrollMax, min, max, props.unitSize);
  };

  const _resolveScrollQueue = () => {
    if (scrollQueue !== null) {
      scrollRef && scrollRef.scrollTo(scrollQueue);
      _handleScrollEnd();
    }
  };

  const _handleScroll = event => {
    if (scrollQueue) {
      return;
    }

    let offset = event.nativeEvent.contentOffset.x;

    let val = _scaleScroll(offset);

    if (val !== value) {
      setValue(val);
      props.onChange(val);
    }
  };

  const _handleScrollEnd = () => {
    setValue(props.value);
    setScrollQueue(null);
  };

  const _getIntervalSize = val => {
    let { largeInterval, mediumInterval } = props;
    if (val % largeInterval === 0) {
      return 'large';
    }
    if (val % mediumInterval === 0) {
      return 'medium';
    }
    return 'small';
  };

  const _renderIntervals = () => {
    let range = max - min + 1;

    let values = times(range, i => i + min);

    return values.map((val, i) => {
      let intervalSize = _getIntervalSize(val);
      console.log({ intervalSize }, val * unitSize);

      return (
        <View key={`val-${i}`} style={styles.intervalContainer}>
          {intervalSize === 'large' && (
            <Text style={[styles.intervalValue, props.styles.intervalValue]}>
              {val * unitSize}
            </Text>
          )}
          <View
            style={[
              styles.interval,
              styles[intervalSize],
              props.styles.interval,
              props.styles[intervalSize],
            ]}
          />
        </View>
      );
    });
  };

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const pinchGesture = Gesture.Pan()
    .onUpdate(e => {
      // scale.value = savedScale.value * e.scale;
      console.log('onUpdate', scale);
    })
    .onEnd(() => {
      // savedScale.value = scale.value;
      console.log('onEnd', savedScale);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // return (
  //   <View style={[styles.container, props.styles.container]}>
  //     <ScrollView
  //       ref={scrollRef}
  //       automaticallyAdjustInsets={false}
  //       horizontal={true}
  //       decelerationRate={0}
  //       snapToInterval={INTERVAL_WIDTH}
  //       snapToAlignment="start"
  //       showsHorizontalScrollIndicator={false}
  //       onScroll={_handleScroll}
  //       onMomentumScrollEnd={_handleScrollEnd}
  //       onContentSizeChange={_resolveScrollQueue}
  //       scrollEventThrottle={100}
  //       pinchGestureEnabled={true}
  //       contentOffset={{ x: contentOffset }}>
  //       <View style={[styles.intervals, props.styles.intervals]}>
  //         {_renderIntervals()}
  //       </View>
  //     </ScrollView>
  //   </View>
  // );

  return (
    <GestureDetector gesture={pinchGesture}>
      <Animated.View
        style={[styles.container, props.styles.container, animatedStyle]}>
        <ScrollView
          ref={scrollRef}
          automaticallyAdjustInsets={false}
          horizontal={true}
          decelerationRate={0}
          snapToInterval={INTERVAL_WIDTH}
          snapToAlignment="start"
          showsHorizontalScrollIndicator={false}
          onScroll={_handleScroll}
          onMomentumScrollEnd={_handleScrollEnd}
          onContentSizeChange={_resolveScrollQueue}
          scrollEventThrottle={100}
          pinchGestureEnabled={true}
          contentOffset={{ x: contentOffset }}>
          <View style={[styles.intervals, props.styles.intervals]}>
            {_renderIntervals()}
          </View>
        </ScrollView>
      </Animated.View>
    </GestureDetector>
  );
};

LineGauge.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  unitSize: PropTypes.number,
  largeInterval: PropTypes.number,
  mediumInterval: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
  styles: PropTypes.object,
};

LineGauge.defaultProps = {
  min: 100,
  max: 1000,
  unitSize: 10,
  mediumInterval: 5,
  largeInterval: 10,
  onChange: () => {},
  styles: {},
};

var styles = StyleSheet.create({
  box: {
    height: 200,
    backgroundColor: 'blue',
  },
  container: {
    height: 100,
    width: GAUGE_WIDTH,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#DDDDDD',
    borderBottomColor: '#DDDDDD',
    backgroundColor: '#F9F9F9',
    marginVertical: 8,
  },
  intervals: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: GAUGE_WIDTH / 2,
    marginHorizontal: -INTERVAL_WIDTH / 2,
  },
  intervalContainer: {
    width: INTERVAL_WIDTH,
    alignItems: 'center',
  },
  interval: {
    width: 1,
    marginRight: -1,
    backgroundColor: '#979797',
  },
  intervalValue: {
    fontSize: 9,
    marginBottom: 3,
    fontWeight: 'bold',
    width: 100,
    textAlign: 'center',
  },
  small: {
    height: 18,
  },
  medium: {
    height: 26,
  },
  large: {
    backgroundColor: '#4A4A4A',
    width: 2,
    height: 30,
  },
  centerline: {
    height: 54,
    width: 1,
    backgroundColor: 'red',
    position: 'absolute',
    left: GAUGE_WIDTH / 2,
    opacity: 0.6,
    top: 0,
    zIndex: -1,
  },
});

export default LineGauge;
