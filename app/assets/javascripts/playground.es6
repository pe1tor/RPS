class Playground {
  constructor() {
    this.playCards = document.querySelectorAll('.playcard');
    this.modalWaiting = document.querySelector('.modal-waiting');
    this.modalResult = document.querySelector('.modal-result');
    this.close = document.querySelectorAll('.close');
    this.modalButton = document.querySelector('.modal-button');
    this.getResult = this.getResult.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.requestParams = this.getRequestParams.bind(this);
    this.displayResultModal = this.displayResultModal.bind(this);
    this.handleErrorResponse = this.handleErrorResponse.bind(this);
  }

  init() {
    this.bindEventListeners();
  }

  bindEventListeners() {
    this.playCards.forEach(element =>
      element.addEventListener('click', () => this.getResult(event.currentTarget))
    );
    this.close.forEach(element =>
      element.addEventListener('click', () => this.closeModal(event))
    );
    this.modalButton.addEventListener('click', () => this.closeModal(event))
  }

  getResult(playCard) {
    const text = playCard.querySelector('.playcard-name').innerHTML.toLowerCase().trim();
    const playCardImage = playCard.querySelector('.playcard-image');
    this.modalWaiting.querySelector('.playcard-image').innerHTML = playCardImage.innerHTML;
    this.modalWaiting.classList.remove('hidden');

    const params = { player_choice: text };
    fetch('/playgrounds', this.getRequestParams(params))
      .then(response => this.handleResponse(response, this.handleSuccess));
  }

  handleSuccess(json) {
    let message = '';
    let heading = '';
    let image = '';
    if (json.result === true) {
      heading = 'You win!';
      message = `Curb with ${json.opponent_choice} lost`;
      image = json.opponent_choice
    } else if (json.result === false) {
      heading = 'You lost!';
      message = `Curb with ${json.opponent_choice} wins`;
      image = json.opponent_choice
    } else if (json.result === 'tie') {
      heading = 'Tie!';
      message = 'It\'s a tie';
      image = 'tie'
    } else if (json.result === null) {
      heading = 'Who should win?';
      message = `Curb choose ${json.opponent_choice}`;
      image = 'wat';
    }
    this.displayResultModal(heading, message, image);
  }

  handleResponse(response, handleSuccessFunction) {
    const {status} = response;
    response.json()
      .then(json => {
        switch (status) {
          case 200:
            handleSuccessFunction(json);
            break;
          case 422:
            this.handleErrorResponse();
            break;
        }
      })
      .catch(() => this.handleErrorResponse());
  }

  displayResultModal(heading, message, image) {
    this.modalWaiting.classList.add('hidden');
    this.modalResult.classList.remove('hidden');
    this.modalResult.querySelector('.js-modal-header').innerHTML = heading;
    this.modalResult.querySelector('.js-modal-subheader').innerHTML = message;
    this.modalResult.querySelector(`.playcard-img.${image}`).classList.remove('hidden');
  }

  handleErrorResponse() {
    const heading = 'Error occurred!';
    const message = `Player wins anyway`;
    const image = 'wat';
    this.displayResultModal(heading, message, image);
  }

  closeModal(event) {
    const modal = event.target.closest('.modal-waiting');
    modal.classList.add('hidden');
    this.modalResult.querySelectorAll('.playcard-img').forEach(element =>
      element.classList.add('hidden')
    );
  }

  getRequestParams(body = {}) {
    const csrfTokenEl = document.querySelector('meta[name="csrf-token"]');
    return {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfTokenEl == null ? '' : csrfTokenEl.content
      },
      body: JSON.stringify(body)
    };
  }
}
