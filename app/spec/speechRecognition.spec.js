import SpeechRecognition from '../src/speechRecognition';

describe("SpeechRecognition", function() {
  const sr = new SpeechRecognition();

  it("finds tag", function() {
    sr.searchByText('Dose show me music').then(res => {
      expect(res.result.parameters.tag).toBe('music');
    })
  });
});
