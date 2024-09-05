import { Component, OnInit } from '@angular/core';
import Peer from 'peerjs';

@Component({
  selector: 'app-shared-window',
  templateUrl: './shared-window.component.html',
  styleUrls: ['./shared-window.component.css'],
})
export class SharedWindowComponent {
  private peer!: Peer;
  private conn: any;

  constructor() {
    this.peer = new Peer(); // Initialize PeerJS
  }

  onClickPantalla() {
    this.peer.on('open', (id: any) => {
      console.log('My peer ID is: ' + id);
    });

    this.peer.on('connection', (conn: any) => {
      this.conn = conn;
    });

    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then((stream: MediaStream) => {
        const call = this.peer.call('tv-peer-id', stream);
        call.on('stream', (remoteStream: MediaStream) => {
          console.log(remoteStream);
          // Display the stream on TV
        });
      })
      .catch((err: any) => {
        console.error('Error accessing media devices: ', err);
      });
  }

  onClickVideo() {
    this.peer.on('open', (id: any) => {
      console.log('My peer ID is: ' + id);
    });

    this.peer.on('call', (call: any) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream: MediaStream) => {
          call.answer(stream); // Answer the call with an A/V stream
          call.on('stream', (remoteStream: MediaStream) => {
            console.log(remoteStream);

            // Display the stream on TV
          });
        })
        .catch((err: any) => {
          console.error('Error accessing media devices: ', err);
        });
    });
  }
}
