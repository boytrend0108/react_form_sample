// #region imports
import React, { useState } from 'react';

import cn from 'classnames';
import usersFromServer from '../../api/users.json';
import { Post } from '../../types/Post';
import { getUserById } from '../../servises/user';
// #endregion

type Props = {
  onSubmit: (post: Post) => void;
};

export const PostForm: React.FC<Props> = ({ onSubmit }) => {
// #region state
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [showTextArea, setShowTextArea] = useState(true);
  const [hasTextAreaError, setHasTextAreaError ] = useState('');
  const [post, setPost] = useState('');

  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);
 // #endregion

// #region function
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    
    setHasTitleError(!title);
    setHasUserError(!userId);
    if (!post) {
      setHasTextAreaError('Enter some message');
    } else if (post.length < 5) {
      setHasTextAreaError('Message should have more then 5 chars');
    }

    if (!title || post.length < 5 || !userId) {
      return;
    }

    onSubmit({
      title,
      id: 0,
      body: post,
      userId,
      user: getUserById(userId)
    });

    reset();
  }

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  }

  const hanbleUserInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  }

  const handleTextAria = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(event.target.value);
    setHasTextAreaError('');
  }

  const reset = () => {
    setTitle('');
    setUserId(0);
    setPost('');
    setHasTextAreaError('');
    setHasTitleError(false);
    setHasUserError(false);
  }
// #endregion

  return (
    <form
      action="#"
      className="box"
      onSubmit={handleSubmit}
      onReset={reset}
    >
      <div className="field">
        <label className="label" htmlFor='post-title'>Title</label>
        <div className={cn('control', {
          'has-icons-right': hasTitleError,
        })}>
          <input
            className={cn('input', {
              'is-danger': hasTitleError,
            })}
            type="text"
            id='post-title'
            placeholder="Enter title"
            value={title}
            onChange={handleTitle}
          />

          {hasTitleError && (
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle has-text-danger"></i>
            </span>
          )}
        </div>

        {hasTitleError && (
          <p className="help is-danger">Title is required</p>
        )}
       
      </div>

      <div className="field">
        <label className="label" htmlFor='form-user'>User</label>
        <div className="control  has-icons-left">
          <div className={cn("select", {
            'is-danger': hasUserError,
          })}>
            <select
              onChange={hanbleUserInput}
              id='form-user'
              value={userId}
            >
              <option value="">Select user</option>
              {usersFromServer.map(user => {
                return (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                )
              })}
            </select>
          </div>

          <span className="icon is-small is-left">
            <i className={cn("fas fa-user", {
              'has-text-danger': hasUserError,
            })}></i>
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
          <label className="label" htmlFor='textarea'>Message</label>
          <div className="control">
            <textarea 
              className={cn("textarea", {
                'is-danger': hasTextAreaError,
              })}
              placeholder="Enter your message"
              id="textarea"
              value={post}
              onChange={handleTextAria}
            ></textarea>
          </div>

          {hasTextAreaError && (
          <p className="help is-danger">{hasTextAreaError}</p>
        )}
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