import React, { Component } from 'react';
import { Modal, Text, View, TextInput, Switch, Button } from 'react-native';

import styles from './styles';

class Settings extends Component {

  state = { settings: { sameGuest: true } }

  handlePress = () => {
    const { updateSettings } = this.props;
    const { settings } = this.state;

    if (!settings.homeMainTime || !settings.homeByoyomi || !settings.homePeriods) {
      return;
    }

    if (!settings.sameGuest && (!settings.guestMainTime || !settings.guestByoyomi || !settings.guestPeriods)) {
      return;
    }

    updateSettings(settings);
  }

  render() {
    const { modalVisible } = this.props;
    const { settings } = this.state;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        <View style={{ marginTop: 80, padding: 40 }}>
          <Text style={{ fontSize: 27, marginBottom: 40 }}>Time Settings</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.label}>Main time</Text>
            <TextInput
              autoFocus
              style={styles.input}
              placeholder="Minutes"
              keyboardType="numeric"
              value={settings.homeMainTime}
              onChangeText={text => this.setState({ settings: { ...settings, homeMainTime: text } })}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.label}>Byoyomi Time</Text>
            <TextInput
              style={styles.input}
              placeholder="Seconds"
              keyboardType="numeric"
              value={settings.homeByoyomi}
              onChangeText={text => this.setState({ settings: { ...settings, homeByoyomi: text } })}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.label}>Byoyomi Periods</Text>
            <TextInput
              style={styles.input}
              placeholder="Number"
              keyboardType="numeric"
              value={settings.homePeriods}
              onChangeText={text => this.setState({ settings: { ...settings, homePeriods: text } })}
            />
          </View>

          <View style={{ marginTop: 30, marginBottom: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.label}>Same settings for guest</Text>
            <Switch type="Switch" value={settings.sameGuest} onValueChange={value => this.setState({ settings: { ...settings, sameGuest: value } })} />
          </View>

          { !settings.sameGuest &&
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.label}>Main time</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Minutes"
                  keyboardType="numeric"
                  value={settings.guestMainTime}
                  onChangeText={text => this.setState({ settings: { ...settings, guestMainTime: text } })}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.label}>Byoyomi Time</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Seconds"
                  keyboardType="numeric"
                  value={settings.guestByoyomi}
                  onChangeText={text => this.setState({ settings: { ...settings, guestByoyomi: text } })}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.label}>Byoyomi Periods</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Number"
                  keyboardType="numeric"
                  value={settings.guestPeriods}
                  onChangeText={text => this.setState({ settings: { ...settings, guestPeriods: text } })}
                />
              </View>
            </View>
          }
          <View style={{ marginTop: 40 }}>
            <Button onPress={this.handlePress} title="Save" />
          </View>
        </View>
      </Modal>
    );
  }
}

export default Settings;
