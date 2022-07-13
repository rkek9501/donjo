import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import times from 'lodash.times';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import Animated from 'react-native-reanimated';
import Input from './Input';
import Button from './Button';

function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const GAUGE_WIDTH = Math.floor(Dimensions.get('window').width);
const INTERVAL_WIDTH = 16;

const calcScale = (v, inputMin, inputMax, outputMin, outputMax, unitSize) => {
  return Math.round(((v - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin) * unitSize / 10;
};

const initialMin = 10;
const initialMax = 100;

const LineGauge = props => {
  const [valueScales, setValueScales] = useState({
    min: 10, max: 100, unitSize: 10
  })
  const [scrollMax, setScrollMax] = useState((initialMax - initialMin) * INTERVAL_WIDTH);
  // const [min, setMin] = useState(10);
  // const [max, setMax] = useState(100);
  // const [unitSize, setUnitSize] = useState(1000);

  const scrollRef = useRef(null);
  const scrollMin = 0;
  // const scrollMax = (max - min) * INTERVAL_WIDTH;

  // const scale = useSharedValue(1);
  const _scaleValue = useCallback((v = 0) => {
    return calcScale(v, valueScales.min, valueScales.max, scrollMin, scrollMax, valueScales.unitSize);
  }, [valueScales, scrollMax]);

  const [value, setValue] = useState(props.value);
  const initialContentOffset = _scaleValue(props.value);
  const [contentOffset] = useState(initialContentOffset);

  useEffect(() => {
    setScrollMax((valueScales.max - valueScales.min) * INTERVAL_WIDTH)
  }, [valueScales])

  const _scaleScroll = useCallback(x => {
    let { min: _min, max: _max } = props;
    return calcScale(x, scrollMin, scrollMax, _min, _max, valueScales.unitSize);
  }, [valueScales, scrollMax]);

  const _handleScroll = event => {

    let offset = event.nativeEvent.contentOffset.x;
    // console.log({ offset });

    let val = _scaleScroll(offset);
    // console.log({ val });
    if (val !== value) {
      setValue(val);
      props.onChange(val);
    }
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

  const _renderIntervals = useCallback(() => {
    const { min, max, unitSize } = valueScales;
    let range = max - min + 1;
    let values = times(range, i => i + min);

    return values.map((val, i) => {
      let intervalSize = _getIntervalSize(val);

      return (
        <View key={`val-${i}`} style={[styles.intervalContainer, { zIndex: intervalSize === 'large' ? 2 : 0}]}>
          <View style={[styles.interval, styles[intervalSize]]} />
          {intervalSize === 'large' && (
            <Text style={[styles.intervalValue]}>
              {val * unitSize}
            </Text>
          )}
        </View>
      );
    });
  }, [scrollMin, valueScales]);

  const pinchGesture = Gesture.Pinch()
    .onStart(e => {
      console.log('onStart', JSON.stringify(e, null, 2));
    })
    .onChange(e => {
      console.log('onChange', JSON.stringify(e, null, 2));
    })
    .onBegin(e => {
      console.log('onBegin', JSON.stringify(e, null, 2));
    })
    .onUpdate(e => {
      console.log('onUpdate', JSON.stringify(e, null, 2));
    })
    .onEnd(e => {
      console.log('onEnd', JSON.stringify(e, null, 2));
    })
    .onFinalize(e => {
      console.log('onFinalize', JSON.stringify(e, null, 2));
    });

  return (
    <GestureHandlerRootView>
      <View style={[styles.container]}>
        <View style={[styles.inputContainer]}>
          <Input
            value={priceToString(value)}
            style={[styles.customInput]}
            onChangeText={setValue}
            selectionColor="#F8503E"
          />
        </View>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal={true}
          decelerationRate={0}
          snapToInterval={INTERVAL_WIDTH}
          snapToAlignment="start"
          showsHorizontalScrollIndicator={false}
          onScroll={_handleScroll}
          // onMomentumScrollEnd={_handleScrollEnd}
          // onContentSizeChange={_resolveScrollQueue}
          scrollEventThrottle={100}
          pinchGestureEnabled={true}
          style={{marginTop: 50}}
          contentOffset={{ x: contentOffset, y: 0 }}>
          <GestureDetector gesture={pinchGesture}>
            <View style={[styles.intervals]}>
              {_renderIntervals()}
            </View>
          </GestureDetector>
        </Animated.ScrollView>
        <View style={[styles.centerline]}>
          <Svg style={[styles.centerlineSvg]} width="14" height="8" viewBox="0 0 14 8" fill="none">
            <Path d="M7 8L0 0L14 0L7 8Z" fill="#F8503E" />
          </Svg>
        </View>
        <Button style={{height: 30, width: 20, right: 0, position: "absolute"}} title="+" onPress={() => {
          setValueScales((prev) => ({
            ...prev,
            unitSize: prev.unitSize * 10
          }));
        }}/>
        <Button style={{height: 30, width: 20, left: 0, position: "absolute"}} title="-" onPress={() => {
          setValueScales((prev) => ({
            ...prev,
            unitSize: prev.unitSize / 10
          }));
        }}/>
      </View>
    </GestureHandlerRootView>
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
  container: {
    height: 150,
    width: GAUGE_WIDTH,
    backgroundColor: 'white',
    // marginVertical: 8,
  },
  intervals: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 100,
    paddingHorizontal: GAUGE_WIDTH / 2,
    marginHorizontal: -INTERVAL_WIDTH / 2,
  },
  intervalContainer: {
    width: INTERVAL_WIDTH,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column-reverse',
    zIndex: 1,
  },
  interval: {
    position: 'absolute',
    width: 2,
    marginRight: -1,
    backgroundColor: '#979797',
  },
  intervalValue: {
    position: 'absolute',
    display: "flex",
    width: 100,
    textAlign: "center",
    height: 20,
    fontSize: 16,
    fontWeight: "300",
    top: 10,
    backgroundColor: "transparent",
  },
  small: {
    height: 30,
  },
  medium: {
    height: 40,
  },
  large: {
    backgroundColor: '#4A4A4A',
    width: 2,
    height: 50,
  },
  centerline: {
    height: 52,
    width: 2,
    backgroundColor: '#F8503E',
    position: 'absolute',
    left: GAUGE_WIDTH / 2 - 1,
    bottom: 0,
  },
  centerlineSvg: {
    position: 'absolute',
    left: -6,
    top: -1,
  },
  inputContainer: {
    position: 'absolute',
    alignItems: "center",
    height: 50,
    left: 0,
    right: 0,
    top: 0,
  },
  customInput: {
    width: 100,
    height: 40,
    textAlign: "center",
    fontSize: 16,
    backgroundColor: "#EDEDED",
    borderWidth: 0,
    textDecorationColor: "#F8503E",
    paddingHorizontal: 0,
  }
});

export default LineGauge;
