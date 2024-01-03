import { useState } from 'react';
import usersFromServer from '../../api/users.json';

export const PostForm = () => {
  const [title, setTitle] = useState('');
  const [showTextArea, setShowTextArea] = useState(true);
  const [user, setUser] = useState('');

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();

  }
  return (
    <form
      action="#"
      className="box"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label className="label" htmlFor='post-title'>Title</label>
        <div className="control has-icons-right">
        <input
            className="input"
            type="text"
            id='post-title'
            placeholder="Enter title"
            onChange={event => setTitle(event.target.value)}
          />

            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
        </div>
        <p className="help is-danger">This email is invalid</p>
      </div>

      <div className="field">
        <label className="label">User</label>
        <div className="control  has-icons-left">
          <div className="select">
            <select
              onChange={event => setUser(event.target.value)}
            >
              <option>Select user</option>
              {usersFromServer.map(user => {
                return (
                  <option
                    key={user.id}
                    value={user.name}
                  >
                    {user.name}
                  </option>
                )
              })}
            </select>
          </div>

          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={showTextArea}
              onChange={event => setShowTextArea(event.target.checked)}
            />
            I want to enter post text
          </label>
        </div>
      </div>

      {showTextArea && (
        <div className="field">
          <label className="label">Message</label>
          <div className="control">
            <textarea className="textarea" placeholder="Textarea"></textarea>
          </div>
        </div>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            className="button is-link"
            type="submit"
          >
            Submit
          </button>
        </div>
        <div className="control">
          <button
            className="button is-link is-light"
            type='reset'
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}