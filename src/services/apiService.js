import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
const REPO = process.env.EXPO_PUBLIC_REPO;

// Helper function to get token from secure storage
const getToken = async () => {
  try {
    return await SecureStore.getItemAsync('github_token');
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// Helper function to get branch from secure storage
const getBranch = async () => {
  try {
    return await SecureStore.getItemAsync('selected_branch');
  } catch (error) {
    console.error('Error getting branch:', error);
    return null;
  }
};

export const fetchBranches = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/api/github/branches`, {
    params: { repo: REPO },
    headers: { Authorization: token },
  });
  return response.data;
};

export const fetchBranchDiff = async (token, branch, extra_headers = {}) => {
  const response = await axios.get(`${API_BASE_URL}/api/github/diff`, {
    params: { repo: REPO, branch: branch },
    headers: { Authorization: token, ...extra_headers },
  });
  return response.data;
};

export const sendUpdateRequest = async (beforeValue, afterValue) => {
  try {
    const token = await getToken();
    const branch = await getBranch();
    
    await axios.put(
      `${API_BASE_URL}/api/github/auto-update`,
      {
        repo: REPO,
        branch: branch,
        before: beforeValue,
        after: afterValue,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log('Auto-update request sent successfully.');
  } catch (error) {
    console.error('Error sending auto-update request:', error);
  }
};

export const fetchDiffChanged = async () => {
  const token = await getToken();
  const branch = await getBranch();
  
  const response = await axios.get(
    `${API_BASE_URL}/api/github/changed`,
    {
      params: {
        repo: REPO,
        branch: branch,
      },
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};

export const fetchCommits = async () => {
  const token = await getToken();
  const branch = await getBranch();
  
  const response = await axios.get(
    `${API_BASE_URL}/api/github/commits`,
    {
      params: {
        repo: REPO,
        branch: branch,
      },
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};

export const fetchContent = async (path) => {
  const token = await getToken();
  
  const response = await axios.get(
    `${API_BASE_URL}/api/github/content`,
    {
      params: {
        repo: REPO,
        path: path,
      },
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};

export const sendUpdateFile = async (filename, translation) => {
  const token = await getToken();
  const branch = await getBranch();
  
  await axios.put(
    `${API_BASE_URL}/api/github/update`,
    {
      repo: REPO,
      translations: translation,
      filename: filename,
      branch: branch,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

// Get current GitHub user
export const getCurrentUser = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/api/github/user`, {
    headers: { Authorization: token },
  });
  return response.data;
};

// Reviewer functionality
export const checkFileApprovalStatus = async (prNumber, filePath) => {
  const token = await getToken();
  const branch = await getBranch();
  
  const response = await axios.get(
    `${API_BASE_URL}/api/github/pr/${prNumber}/file/${encodeURIComponent(
      filePath
    )}/approved`,
    {
      params: { repo: REPO, branch: branch },
      headers: { Authorization: token },
    }
  );
  return response.data;
};

// Retrieve list of reviewers
export const getReviewers = async () => {
  const token = await getToken();
  const branch = await getBranch();
  
  const response = await axios.get(`${API_BASE_URL}/api/github/reviewers`, {
    params: { repo: REPO, branch: branch },
    headers: { Authorization: token },
  });
  return response.data;
};

export const approveFile = async (prNumber, filePath, sha, lang, labelName) => {
  const token = await getToken();
  
  const response = await axios.post(
    `${API_BASE_URL}/api/github/pr/${prNumber}/file/${encodeURIComponent(
      filePath
    )}/approve`,
    {
      repo: REPO,
      sha: sha,
      lang: lang,
      label_name: labelName,
    },
    {
      headers: { Authorization: token },
    }
  );
  return response.data;
};

// Get all comments for a PR
export const getPRComments = async (prNumber) => {
  const token = await getToken();
  
  const response = await axios.get(`${API_BASE_URL}/api/github/pr/comments`, {
    params: { repo: REPO, prNumber: prNumber },
    headers: { Authorization: token },
  });
  return response.data;
};
